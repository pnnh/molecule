using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Polaris.Utils;
using System.Text;
using Molecule.Models;
using Polaris.Business.Models;
using Polaris.Business.Helpers;
using Molecule.Helpers;

namespace Polaris.Controllers;

[ApiController]
public class RelationContentController : ControllerBase
{
    private readonly ILogger<RelationContentController> _logger;
    private readonly DatabaseContext _dataContext;

    public RelationContentController(ILogger<RelationContentController> logger, DatabaseContext configuration)
    {
        this._logger = logger;
        this._dataContext = configuration;
    }

//     [Route("/server/relation/{pk}")]
//     [HttpGet]
//     [AllowAnonymous]
//     public RelationModel Get([FromRoute] string pk)
//     {
//         var queryHelper = new PLQueryHelper(Request.Query);
//         var channel = queryHelper.GetString("channel") ?? throw new Exception("channel is required"); ;
//         var sqlBuilder = new StringBuilder();
//         var parameters = new Dictionary<string, object>();

//         sqlBuilder.Append(@"
// select a.*, r.pk as relation, r.discover, r.source as channel
// from relations as r join relations as a on r.target = a.pk
// where r.direction = 'cta' and r.source = @channel and r.target = @relation
// ");
//         parameters.Add("@channel", channel);
//         parameters.Add("@relation", pk);

//         var querySqlText = sqlBuilder.ToString();

//         var modelsQuery = DatabaseContextHelper.RawSqlQuery<RelationModel>(_dataContext, querySqlText, parameters);

//         var model = modelsQuery.FirstOrDefault();

//         if (model == null)
//         {
//             throw new PLBizException("文章不存在");
//         }

//         return model;
//     }


    [Route("/server/relation")]
    [AllowAnonymous]
    public PLSelectResult<RelationModel> Select()
    {
        var queryHelper = new PLQueryHelper(Request.Query);
        var source = queryHelper.GetString("source");
        var target = queryHelper.GetString("target");
        var direction = queryHelper.GetString("direction");
        if (source == null || target == null || direction == null)
        {
            throw new PLBizException("source or target or direction is required");
        }

        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select r.*
from relations as r
where r.direction = @direction and r.source = @source and r.target = @target
");
        parameters.Add("@direction", direction);
        parameters.Add("@source", source);
        parameters.Add("@target", target);

        var querySqlText = sqlBuilder.ToString();

        var modelsQuery = DatabaseContextHelper.RawSqlQuery<RelationModel>(_dataContext, querySqlText, parameters);

        var models = modelsQuery.ToList();

        return new PLSelectResult<RelationModel>
        {
            Range = models,
            Count = models.Count,
        };
    }

    // [Route("/server/relation/{pk}")]
    // [HttpDelete]
    // public PLDeleteResult Delete([FromRoute] string pk)
    // {
    //     var model = _dataContext.Relations.FirstOrDefault(m => m.Pk == pk);
    //     if (model == null)
    //     {
    //         throw new PLBizException("文章不存在");
    //     }
    //     _dataContext.Relations.Remove(model);
    //     var changes = _dataContext.SaveChanges();

    //     return new PLDeleteResult
    //     {
    //         Changes = changes
    //     };
    // }

    // [Route("/server/relation")]
    // [HttpPost]
    // public async Task<PLInsertResult> Insert()
    // {
    //     var jsonHelper = await JsonHelper.NewAsync(Request.Body);
    //     var title = jsonHelper.GetString("title") ?? throw new PLBizException("title is required");
    //     var body = jsonHelper.GetString("body") ?? throw new PLBizException("body is required");

    //     var user = HttpContext.User;
    //     if (user.Identity == null || string.IsNullOrEmpty(user.Identity.Name))
    //     {
    //         throw new PLBizException("用户未登录");
    //     }
    //     var model = new RelationModel()
    //     {
    //         Pk = Guid.NewGuid().ToString(),
    //         Title = title,
    //         Body = body,
    //         Header = "markdown",
    //         CreateTime = DateTime.UtcNow,
    //         UpdateTime = DateTime.UtcNow,
    //         Creator = user.Identity.Name,
    //     };
    //     _dataContext.Relations.Add(model);
    //     _dataContext.SaveChanges();

    //     return new PLInsertResult { Pk = model.Pk };
    // }

    // [Route("/server/relation/{pk}")]
    // [HttpPut]
    // public async Task<PLUpdateResult> Update([FromRoute]string pk)
    // {
    //     var jsonHelper = await JsonHelper.NewAsync(Request.Body);
    //     var title = jsonHelper.GetString("title") ?? throw new PLBizException("title is required");
    //     var body = jsonHelper.GetString("body") ?? throw new PLBizException("body is required");

    //     var model = _dataContext.Relations.FirstOrDefault(m => m.Pk == pk);
    //     if (model == null)
    //     { 
    //         throw new PLBizException("文章不存在");
    //     }

    //     model.Title = title;
    //     model.Body = body;
    //     var changes = _dataContext.SaveChanges();

    //     return new PLUpdateResult { Changes = changes };
    // }

    // [Route("/server/relation/share")]
    // [HttpPost]
    // public async Task<PLUpdateResult> Share()
    // {
    //     var formHelper = await JsonHelper.NewAsync(Request.Body);
    //     var pk = formHelper.GetString("pk") ?? throw new Exception("pk is required");
    //     var address = formHelper.GetString("address") ?? throw new Exception("address is required");

    //     var model = _dataContext.Channels.FirstOrDefault(m => m.Name == address);
    //     if (model == null)
    //     {
    //         throw new PLBizException("频道不存在");
    //     }
    //     var user = HttpContext.User;
    //     var creatorPk = "";
    //     if (user.Identity != null && !string.IsNullOrEmpty(user.Identity.Name))
    //     {
    //         var account = _dataContext.Accounts.FirstOrDefault(o => o.Username == user.Identity.Name);
    //         if (account != null) creatorPk = account.Pk;
    //     }
    //     var relation = new RelationModel()
    //     {
    //         Pk = Guid.NewGuid().ToString(),
    //         Source = model.Pk,
    //         Target = pk,
    //         Direction = "cta",
    //         CreateTime = DateTime.UtcNow,
    //         UpdateTime = DateTime.UtcNow,
    //         Creator = creatorPk,
    //         Discover = 0,
    //     };
    //     _dataContext.Relations.Add(relation);
    //     var changes = _dataContext.SaveChanges();

    //     return new PLUpdateResult { Changes = changes };
    // }
}