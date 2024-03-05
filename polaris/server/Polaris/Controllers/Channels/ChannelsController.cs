using System.Data.Entity;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Molecule.Helpers;
using Polaris.Business.Helpers;
using Polaris.Business.Models;

namespace Polaris.Controllers.Channels;

[ApiController]
[Authorize]
public class ChannelsController(ILogger<ChannelsController> logger, DatabaseContext configuration)
    : ControllerBase
{
    private readonly ILogger<ChannelsController> _logger = logger;

    [Route("/channels/{name}")]
    [HttpGet]
    [AllowAnonymous]
    public ChannelModel? Get([FromRoute] string name)
    {
        if (string.IsNullOrEmpty(name) || string.IsNullOrWhiteSpace(name))
            return null;

        long? nid = null;

#if DEBUG
        if (long.TryParse(name, out var longValue))
            nid = longValue;
#endif
        if (nid == null && MIDHelper.Default.Base32Long(name, out var baseValue)) nid = baseValue;

        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select a.*
from channels as a 
");

        sqlBuilder.Append(" where a.name = @name");
        parameters.Add("name", name);
        if (nid.HasValue)
        {
            sqlBuilder.Append(" or a.nid = @nid");
            parameters.Add("nid", nid.Value);
        }

        var querySqlText = sqlBuilder.ToString();

        var modelsQuery = DatabaseContextHelper.RawSqlQuery<ChannelModel>(configuration, querySqlText, parameters);

        var model = modelsQuery.FirstOrDefault();

        if (model == null) throw new PLBizException("数据不存在");

        return model;
    }

    [Route("/channels/{pk}")]
    [HttpDelete]
    public async Task<PLDeleteResult> Delete([FromRoute] string pk)
    {
        if (!Guid.TryParse(pk, out var uid)) throw new PLBizException("频道不存在");
        var model = await configuration.Channels.FirstOrDefaultAsync(m => m.Uid == uid);
        if (model == null) throw new PLBizException("频道不存在");
        configuration.Channels.Remove(model);
        var changes = configuration.SaveChanges();

        return new PLDeleteResult { Changes = changes };
    }

    [Route("/channels")]
    [HttpGet]
    [AllowAnonymous]
    public PLSelectResult<ChannelModel> Select()
    {
        var queryHelper = new MQueryHelper(Request.Query);
        var page = queryHelper.GetInt("page") ?? 1;
        var size = queryHelper.GetInt("size") ?? 10;
        var (offset, limit) = MPagination.CalcOffset(page, size);
        var models = configuration.Channels.OrderByDescending(o => o.UpdateTime).Skip(offset).Take(limit).ToList();
        var totalCount = configuration.Channels.Count();

        return new PLSelectResult<ChannelModel>
        {
            Range = models,
            Count = totalCount
        };
    }

    [Route("/channels/{uid}/posts")]
    [AllowAnonymous]
    public PLSelectResult<PostModel> SelectPosts([FromRoute] Guid uid)
    {
        var queryHelper = new MQueryHelper(Request.Query);
        var keyword = queryHelper.GetString("keyword");
        var sort = queryHelper.GetString("sort") ?? "latest";
        var filter = queryHelper.GetString("filter") ?? "all";

        var page = queryHelper.GetInt("page") ?? 1;
        var size = queryHelper.GetInt("size") ?? 10;
        var (offset, limit) = MPagination.CalcOffset(page, size);

        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select a.*, p.nickname as owner_name, c.name as channel_name
from posts as a
     left join partitions pa on pa.uid = a.partition
     left join accounts as p on p.uid = a.owner
     left join channels as c on c.uid = a.channel
where a.channel = @channel
");
        parameters.Add("channel", uid);

        if (keyword != null && !string.IsNullOrEmpty(keyword))
        {
            sqlBuilder.Append(@" and (a.title like @keyword or a.description like @keyword)");
            parameters.Add("@keyword", $@"%{keyword}%");
        }

        if (filter == "month")
        {
            sqlBuilder.Append(@" and a.update_time > @update_time");
            parameters.Add("@update_time", DateTime.UtcNow.AddMonths(-1));
        }
        else if (filter == "year")
        {
            sqlBuilder.Append(@" and a.update_time > @update_time");
            parameters.Add("@update_time", DateTime.UtcNow.AddYears(-1));
        }

        var countSqlText = $@"
select count(1) from ({sqlBuilder}) as temp;";

        var totalCount = DatabaseContextHelper.RawSqlScalar<int?>(configuration, countSqlText, parameters);

        sqlBuilder.Append(sort == "read" ? @" order by a.discover desc" : @" order by a.update_time desc");

        sqlBuilder.Append(@" limit @limit offset @offset;");
        parameters.Add("@offset", offset);
        parameters.Add("@limit", limit);

        var querySqlText = sqlBuilder.ToString();

        var modelsQuery = DatabaseContextHelper.RawSqlQuery<PostModel>(configuration, querySqlText, parameters);

        var models = modelsQuery.ToList();

        return new PLSelectResult<PostModel>
        {
            Range = models,
            Count = totalCount ?? 0
        };
    }

    [Route("/channels")]
    [HttpPost]
    public async Task<PLInsertResult> Insert([FromBody] ChannelModel request)
    {
        var user = HttpContext.User;
        if (user.Identity == null || string.IsNullOrEmpty(user.Identity.Name)) throw new PLBizException("用户未登录");
        var model = new ChannelModel
        {
            Uid = MIDHelper.Default.NewUUIDv7(),
            Title = request.Title,
            CreateTime = DateTime.UtcNow,
            UpdateTime = DateTime.UtcNow,
            Owner = Guid.Empty,
            Description = request.Description,
            Image = request.Image
        };
        await configuration.Channels.AddAsync(model);
        await configuration.SaveChangesAsync();

        return new PLInsertResult { Pk = model.Uid };
    }

    [Route("/channels/{pk}")]
    [HttpPut]
    public async Task<PLUpdateResult> Update([FromBody] ChannelModel request)
    {
        var model = await configuration.Channels.FirstOrDefaultAsync(m => m.Uid == request.Uid);
        if (model == null) throw new PLBizException("频道不存在");

        model.Title = request.Title;
        var changes = configuration.SaveChanges();

        return new PLUpdateResult { Changes = changes };
    }

    [Route("/channels/{channel}/relation/{post}")]
    [HttpPost]
    public PLUpdateResult Share([FromRoute] Guid channel, [FromRoute] Guid post)
    {
        var model = configuration.Channels.FirstOrDefault(m => m.Uid == channel);
        if (model == null) throw new PLBizException("频道不存在");
        var user = HttpContext.User;
        var creatorPk = Guid.Empty;
        if (user.Identity != null && !string.IsNullOrEmpty(user.Identity.Name))
        {
            var account = configuration.Accounts.FirstOrDefault(o => o.Username == user.Identity.Name);
            if (account != null) creatorPk = account.Uid;
        }

        var relation = new RelationModel
        {
            Uid = MIDHelper.Default.NewUUIDv7(),
            Source = model.Uid,
            Target = post,
            Direction = "cta",
            CreateTime = DateTime.UtcNow,
            UpdateTime = DateTime.UtcNow,
            Owner = creatorPk,
            Discover = 0
        };
        configuration.Relations.Add(relation);
        var changes = configuration.SaveChanges();

        return new PLUpdateResult { Changes = changes };
    }
}