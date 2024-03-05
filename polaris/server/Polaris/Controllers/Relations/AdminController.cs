using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Molecule.Helpers;
using Molecule.Models;
using Polaris.Business.Helpers;
using Polaris.Business.Models;

namespace Polaris.Controllers.Relations;

[ApiController]
[Authorize]
public class RelationsController : ControllerBase
{
    private readonly DatabaseContext _dataContext;
    private readonly ILogger<RelationsController> _logger;

    public RelationsController(ILogger<RelationsController> logger, DatabaseContext configuration)
    {
        _logger = logger;
        _dataContext = configuration;
    }

    [Route("/admin/relations")]
    [HttpGet]
    public MSelectResult<RelationFullModel<ChannelModel, HistoryModel>> Select()
    {
        var queryHelper = new MQueryHelper(Request.Query);
        var channel = queryHelper.GetString("channel");

        var page = queryHelper.GetInt("page") ?? 1;
        var size = queryHelper.GetInt("size") ?? 10;
        var (offset, limit) = MPagination.CalcOffset(page, size);

        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select r.*,  row_to_json(c.*) as source_model, row_to_json(h.*) as target_model
from relations as r
    left join channels as c on r.source = c.uid
    left join history as h on r.target = h.pk
where r.status = 0 
");
        if (!string.IsNullOrEmpty(channel))
        {
            sqlBuilder.Append(@" and r.source = @channel");
            parameters.Add("@channel", channel);
        }

        var countSqlText = $@"
select count(1) from ({sqlBuilder}) as temp;";

        var totalCount = DatabaseContextHelper.RawSqlScalar<int?>(_dataContext, countSqlText, parameters);

        sqlBuilder.Append(@" order by r.update_time asc");
        sqlBuilder.Append(@" limit @limit offset @offset;");
        parameters.Add("@offset", offset);
        parameters.Add("@limit", limit);

        var querySqlText = sqlBuilder.ToString();

        var modelsQuery =
            DatabaseContextHelper.RawSqlQuery<RelationFullModel<ChannelModel, HistoryModel>>(_dataContext, querySqlText,
                parameters);

        var models = modelsQuery.ToList();

        return new MSelectResult<RelationFullModel<ChannelModel, HistoryModel>>
        {
            Range = models,
            Count = totalCount ?? 0
        };
    }

    [Route("/admin/relations/{pk}")]
    [HttpDelete]
    public CommonResult<object> Delete([FromRoute] string pk)
    {
        if (!Guid.TryParse(pk, out var uid)) throw new PLBizException("频道不存在");
        var model = _dataContext.Relations.FirstOrDefault(m => m.Uid == uid);
        if (model == null) return new CommonResult<object> { Code = Codes.NotFound, Message = "文章不存在" };
        _dataContext.Relations.Remove(model);
        _dataContext.SaveChanges();

        return new CommonResult<object>
        {
            Code = Codes.Ok,
            Data = new
            {
                Pk = model.Uid
            }
        };
    }


    [Route("/admin/relations/{pk}")]
    [HttpPost]
    public async Task<CommonResult<object>> Update([FromRoute] string pk)
    {
        if (!Guid.TryParse(pk, out var uid)) throw new PLBizException("频道不存在");
        var jsonHelper = await JsonHelper.NewAsync(Request.Body);
        var status = jsonHelper.GetInt("status");
        if (status == null)
            return new CommonResult<object>
            {
                Code = Codes.BadRequest
            };
        var model = _dataContext.Relations.FirstOrDefault(m => m.Uid == uid);
        if (model == null)
            return new CommonResult<object>
            {
                Code = Codes.NotFound
            };

        model.Status = status.Value;
        _dataContext.SaveChanges();

        return new CommonResult<object> { Code = Codes.Ok, Data = model.Uid };
    }
}