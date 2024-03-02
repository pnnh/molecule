using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using Venus.Business.Models;
using Venus.Business.Helpers;
using Molecule.Helpers;
using Venus.Business.Services;

namespace Venus.Controllers.Article;

[ApiController]
public class ArticleContentController : ControllerBase
{
    private readonly ILogger<ArticleContentController> _logger;
    private readonly DatabaseContext _dataContext;

    public ArticleContentController(ILogger<ArticleContentController> logger, DatabaseContext configuration)
    {
        this._logger = logger;
        this._dataContext = configuration;
    }

    [Route("/server/posts/{pk}")]
    [HttpGet]
    [AllowAnonymous]
    public PageModel Get([FromRoute] string pk)
    {
        var queryHelper = new PLQueryHelper(Request.Query);

        var pageService = new PageService(new Business.Services.ServiceContext(_dataContext));

        if (pk == "+")
        {
            var getResult = pageService.GetByQuery(queryHelper);
            if (getResult == null)
            {
                throw PLBizException.BadRequest("文章不存在");
            }
            return getResult;
        }

        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select a.*
from posts as a
where a.pk = @article
");
        parameters.Add("@article", pk);

        var querySqlText = sqlBuilder.ToString();

        var modelsQuery = DatabaseContextHelper.RawSqlQuery<PageModel>(_dataContext, querySqlText, parameters);

        var model = modelsQuery.FirstOrDefault();

        if (model == null)
        {
            throw new PLBizException("文章不存在");
        }

        return model;
    }


    [Route("/server/posts")]
    [AllowAnonymous]
    public PLSelectResult<PageModel> Select()
    {
        var queryHelper = new PLQueryHelper(Request.Query);
        var channel = queryHelper.GetString("channel");
        var keyword = queryHelper.GetString("keyword");
        var sort = queryHelper.GetString("sort") ?? "latest";
        var filter = queryHelper.GetString("filter") ?? "all";

        var page = queryHelper.GetInt("page") ?? 1;
        var size = queryHelper.GetInt("size") ?? 10;
        var (offset, limit) = Pagination.CalcOffset(page, size);

        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select a.*, p.username as profile_name, c.name as channel_name,
        '/' || replace(pa.path::varchar, '.', '/') as path
from posts as a
     join partitions pa on pa.pk = a.partition
     join profiles as p on p.pk = a.profile
     join channels as c on c.pk = a.channel
where a.pk is not null
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

        var totalCount = DatabaseContextHelper.RawSqlScalar<int?>(_dataContext, countSqlText, parameters);

        if (sort == "read")
        {
            sqlBuilder.Append(@" order by a.discover desc");
        }
        else
        {
            sqlBuilder.Append(@" order by a.update_time desc");
        }

        sqlBuilder.Append(@" limit @limit offset @offset;");
        parameters.Add("@offset", offset);
        parameters.Add("@limit", limit);

        var querySqlText = sqlBuilder.ToString();

        var modelsQuery = DatabaseContextHelper.RawSqlQuery<PageModel>(_dataContext, querySqlText, parameters);

        var models = modelsQuery.ToList();

        return new PLSelectResult<PageModel>
        {
            Range = models,
            Count = totalCount ?? 0,
        };
    }

    [Route("/server/page/{pk}")]
    [HttpDelete]
    public PLDeleteResult Delete([FromRoute] string pk)
    {
        var model = _dataContext.Pages.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            throw new PLBizException("文章不存在");
        }
        _dataContext.Pages.Remove(model);
        var changes = _dataContext.SaveChanges();

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
        if (user.Identity == null || string.IsNullOrEmpty(user.Identity.Name))
        {
            throw new PLBizException("用户未登录");
        }
        var model = new PageModel()
        {
            Pk = Guid.NewGuid().ToString(),
            Title = title,
            Body = body,
            Header = "markdown",
            CreateTime = DateTime.UtcNow,
            UpdateTime = DateTime.UtcNow,
            Creator = user.Identity.Name,
        };
        _dataContext.Pages.Add(model);
        _dataContext.SaveChanges();

        return new PLInsertResult { Pk = model.Pk };
    }

    [Route("/server/page/{pk}")]
    [HttpPut]
    public async Task<PLUpdateResult> Update([FromRoute] string pk)
    {
        var jsonHelper = await JsonHelper.NewAsync(Request.Body);
        var title = jsonHelper.GetString("title") ?? throw new PLBizException("title is required");
        var body = jsonHelper.GetString("body") ?? throw new PLBizException("body is required");

        var model = _dataContext.Pages.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            throw new PLBizException("文章不存在");
        }

        model.Title = title;
        model.Body = body;
        var changes = _dataContext.SaveChanges();

        return new PLUpdateResult { Changes = changes };
    }

    [Route("/server/page/share")]
    [HttpPost]
    public async Task<PLUpdateResult> Share()
    {
        var formHelper = await JsonHelper.NewAsync(Request.Body);
        var pk = formHelper.GetString("pk") ?? throw new Exception("pk is required");
        var address = formHelper.GetString("address") ?? throw new Exception("address is required");

        var model = _dataContext.Channels.FirstOrDefault(m => m.Name == address);
        if (model == null)
        {
            throw new PLBizException("频道不存在");
        }
        var user = HttpContext.User;
        var creatorPk = "";
        if (user.Identity != null && !string.IsNullOrEmpty(user.Identity.Name))
        {
            var account = _dataContext.Accounts.FirstOrDefault(o => o.Username == user.Identity.Name);
            if (account != null) creatorPk = account.Pk;
        }
        var relation = new RelationModel()
        {
            Pk = Guid.NewGuid().ToString(),
            Source = model.Pk,
            Target = pk,
            Direction = "cta",
            CreateTime = DateTime.UtcNow,
            UpdateTime = DateTime.UtcNow,
            Creator = creatorPk,
            Discover = 0,
        };
        _dataContext.Relations.Add(relation);
        var changes = _dataContext.SaveChanges();

        return new PLUpdateResult { Changes = changes };
    }
}