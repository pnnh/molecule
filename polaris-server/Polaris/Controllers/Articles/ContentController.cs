using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Molecule.Helpers;
using Molecule.Models;
using Polaris.Business.Helpers;
using Polaris.Business.Models;
using Polaris.Business.Services;

namespace Polaris.Controllers.Articles;

[ApiController]
public class ArticleContentController(DatabaseContext configuration, ModelService modelService) : ControllerBase
{
    [Route("/posts/{name}")]
    [HttpGet]
    [AllowAnonymous]
    public PostModel? Get([FromRoute] string name)
    {
        var model = modelService.GetByUrn<PostModel>(name);
        return model;
    }

    [Route("/posts")]
    [AllowAnonymous]
    [HttpGet]
    public MSelectResult<PostModel> Select()
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
");
        sqlBuilder.Append(" where 1=1 ");
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

        return new MSelectResult<PostModel>
        {
            Range = models,
            Count = totalCount ?? 0
        };
    }

    [Route("/posts/{uid}")]
    [HttpDelete]
    public PLDeleteResult Delete([FromRoute] Guid uid)
    {
        var model = configuration.Pages.FirstOrDefault(m => m.Uid == uid);
        if (model == null) throw new PLBizException("文章不存在");
        configuration.Pages.Remove(model);
        var changes = configuration.SaveChanges();

        return new PLDeleteResult
        {
            Changes = changes
        };
    }

    [Route("/posts")]
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

    [Route("/posts/{uid}")]
    [HttpPut]
    public async Task<PLUpdateResult> Update([FromRoute] Guid uid)
    {
        var jsonHelper = await JsonHelper.NewAsync(Request.Body);
        var title = jsonHelper.GetString("title") ?? throw new PLBizException("title is required");
        var body = jsonHelper.GetString("body") ?? throw new PLBizException("body is required");

        var model = configuration.Pages.FirstOrDefault(m => m.Uid == uid);
        if (model == null) throw new PLBizException("文章不存在");

        model.Title = title;
        model.Body = body;
        var changes = configuration.SaveChanges();

        return new PLUpdateResult { Changes = changes };
    }
}