﻿using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Polaris.Utils;
using System.Text;
using Molecule.Models;
using Polaris.Business.Models;
using Polaris.Business.Helpers;
using Molecule.Helpers;
using System.Threading.Channels;
using System.Text.Json;

namespace Polaris.Controllers.Relations;

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

    [Route("/server/relation")]
    [AllowAnonymous]
    [HttpGet]
    public string Select()
    {
        var queryHelper = new PLQueryHelper(Request.Query);
        var profile = queryHelper.GetString("source.profile");
        var channel = queryHelper.GetString("channel");
        var direction = queryHelper.GetString("direction");

        var sort = queryHelper.GetString("sort") ?? "latest";
        var filter = queryHelper.GetString("filter") ?? "all";

        // 目前只支持cta一种，需要根据关系设置查询条件
        if (direction != "cta")
        {
            throw new PLBizException("参数错误");
        }

        var page = queryHelper.GetInt("page") ?? 1;
        var size = queryHelper.GetInt("size") ?? 10;
        var (offset, limit) = Pagination.CalcOffset(page, size);

        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select r.*, row_to_json(s.*) as source_model, row_to_json(t.*) as target_model
from relations as r
    join channels as s on s.pk = r.source
    join articles as t on r.target = t.pk
where r.direction = @direction and s.pk is not null and t.pk is not null
");
        parameters.Add("@direction", direction);
        if (!string.IsNullOrEmpty(profile))
        {
            sqlBuilder.Append(@" and s.profile = @profile");
            parameters.Add("@profile", profile);
        }
        if (!string.IsNullOrEmpty(channel))
        {
            sqlBuilder.Append(@" and r.source = @channel");
            parameters.Add("@channel", channel);
        }

        if (filter == "month")
        {
            sqlBuilder.Append(@" and r.update_time > @update_time");
            parameters.Add("@update_time", DateTime.UtcNow.AddMonths(-1));
        }
        else if (filter == "year")
        {
            sqlBuilder.Append(@" and r.update_time > @update_time");
            parameters.Add("@update_time", DateTime.UtcNow.AddYears(-1));
        }

        var countSqlText = $@"
select count(1) from ({sqlBuilder}) as temp;";

        var totalCount = DatabaseContextHelper.RawSqlScalar<int?>(_dataContext, countSqlText, parameters);

        if (sort == "read")
        {
            sqlBuilder.Append(@" order by r.discover desc");
        }
        else
        {
            sqlBuilder.Append(@" order by r.update_time desc");
        }

        sqlBuilder.Append(@" limit @limit offset @offset;");
        parameters.Add("@offset", offset);
        parameters.Add("@limit", limit);

        var querySqlText = sqlBuilder.ToString();

        var modelsQuery = DatabaseContextHelper.RawSqlQuery<RelationFullModel<ChannelModel, ArticleModel>>(_dataContext, querySqlText, parameters);

        var models = modelsQuery.ToList();

        var result = new PLSelectResult<RelationFullModel<ChannelModel, ArticleModel>>
        {
            Page = page,
            Size = size,
            Count = totalCount ?? models.Count,
            Range = models,
        };
        var responseText = JsonSerializer.Serialize(result, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        });
        return responseText;
    }

}