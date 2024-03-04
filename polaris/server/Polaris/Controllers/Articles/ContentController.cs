using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Molecule.Helpers;
using Polaris.Business.Helpers;
using Polaris.Business.Models;

namespace Polaris.Controllers.Articles;

[ApiController]
public class ArticleContentController(DatabaseContext configuration) : ControllerBase
{
    [Route("/posts/{name}")]
    [HttpGet]
    [AllowAnonymous]
    public PostModel? Get([FromRoute] string name)
    {
        if (string.IsNullOrEmpty(name) || string.IsNullOrWhiteSpace(name))
            return null;
        Guid? uid = null;
        long? nid = null;
        switch (name.Length)
        {
            case <= 20:
                if (name.Length <= 13)
                {
                    var baseValue = MIDHelper.Default.Base32Long(name);
                    if (baseValue != null)
                        nid = baseValue;
                }

                if (nid == null && long.TryParse(name, out var longValue)) nid = longValue;
                break;
            case 32:
            case 36:
            {
                if (Guid.TryParse(name, out var guidValue))
                    uid = guidValue;
                break;
            }
        }

        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select a.*
from posts as a
");
        if (uid.HasValue)
        {
            sqlBuilder.Append(" where  a.uid = @uid");
            parameters.Add("uid", uid.Value);
        }
        else if (nid.HasValue)
        {
            sqlBuilder.Append(" where  a.nid = @nid");
            parameters.Add("nid", nid.Value);
        }
        else
        {
            sqlBuilder.Append(" where  a.name = @name");
            parameters.Add("name", name);
        }

        var querySqlText = sqlBuilder.ToString();

        var modelsQuery = DatabaseContextHelper.RawSqlQuery<PostModel>(configuration, querySqlText, parameters);

        var model = modelsQuery.FirstOrDefault();

        if (model == null) throw new PLBizException("文章不存在");

        return model;
    }


    [Route("/posts")]
    [AllowAnonymous]
    public PLSelectResult<PostModel> Select()
    {
        var queryHelper = new MQueryHelper(Request.Query);
        var channel = queryHelper.GetString("channel");
        var keyword = queryHelper.GetString("keyword");
        var sort = queryHelper.GetString("sort") ?? "latest";
        var filter = queryHelper.GetString("filter") ?? "all";

        var page = queryHelper.GetInt("page") ?? 1;
        var size = queryHelper.GetInt("size") ?? 10;
        var (offset, limit) = MPagination.CalcOffset(page, size);

        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select a.*, p.nickname as owner_name, c.name as channel_name,
        '/' || replace(pa.path::varchar, '.', '/') as path
from posts as a
     left join partitions pa on pa.uid = a.partition
     left join accounts as p on p.uid = a.owner
     left join channels as c on c.uid = a.channel
where a.uid is not null
");
        if (!string.IsNullOrEmpty(channel))
        {
            sqlBuilder.Append(@" and a.channel = @channel");
            parameters.Add("@channel", channel);
        }

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

    [Route("/server/page/{pk}")]
    [HttpDelete]
    public PLDeleteResult Delete([FromRoute] string pk)
    {
        var model = configuration.Pages.FirstOrDefault(m => m.Uid.ToString() == pk);
        if (model == null) throw new PLBizException("文章不存在");
        configuration.Pages.Remove(model);
        var changes = configuration.SaveChanges();

        return new PLDeleteResult
        {
            Changes = changes
        };
    }

    [Route("/server/page")]
    [HttpPost]
    public async Task<PLInsertResult> Insert()
    {
        var jsonHelper = await JsonHelper.NewAsync(Request.Body);
        var title = jsonHelper.GetString("title") ?? throw new PLBizException("title is required");
        var body = jsonHelper.GetString("body") ?? throw new PLBizException("body is required");

        var user = HttpContext.User;
        if (user.Identity == null || string.IsNullOrEmpty(user.Identity.Name)) throw new PLBizException("用户未登录");
        var model = new PostModel
        {
            Uid = MIDHelper.Default.NewUUIDv7(),
            Title = title,
            Body = body,
            Header = "markdown",
            CreateTime = DateTime.UtcNow,
            UpdateTime = DateTime.UtcNow,
            Owner = Guid.Empty
        };
        configuration.Pages.Add(model);
        configuration.SaveChanges();

        return new PLInsertResult { Pk = model.Uid };
    }

    [Route("/server/page/{pk}")]
    [HttpPut]
    public async Task<PLUpdateResult> Update([FromRoute] string pk)
    {
        var jsonHelper = await JsonHelper.NewAsync(Request.Body);
        var title = jsonHelper.GetString("title") ?? throw new PLBizException("title is required");
        var body = jsonHelper.GetString("body") ?? throw new PLBizException("body is required");

        var model = configuration.Pages.FirstOrDefault(m => m.Uid.ToString() == pk);
        if (model == null) throw new PLBizException("文章不存在");

        model.Title = title;
        model.Body = body;
        var changes = configuration.SaveChanges();

        return new PLUpdateResult { Changes = changes };
    }

    [Route("/server/page/share")]
    [HttpPost]
    public async Task<PLUpdateResult> Share()
    {
        var formHelper = await JsonHelper.NewAsync(Request.Body);
        var pk = formHelper.GetString("pk") ?? throw new Exception("pk is required");
        var address = formHelper.GetString("address") ?? throw new Exception("address is required");

        var model = configuration.Channels.FirstOrDefault(m => m.Name == address);
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
            Uid = Guid.NewGuid(),
            Source = model.Uid,
            Target = Guid.Parse(pk),
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