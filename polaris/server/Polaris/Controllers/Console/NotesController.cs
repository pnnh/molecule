using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using Polaris.Business.Models;
using Polaris.Business.Models.Personal;
using Polaris.Business.Helpers;
using Molecule.Helpers;
using Polaris.Business.Services;

namespace Polaris.Controllers.Console;

[ApiController]
public class NoteContentController : ControllerBase
{
    private readonly ILogger<NoteContentController> _logger;
    private readonly DatabaseContext _dataContext;

    public NoteContentController(ILogger<NoteContentController> logger, DatabaseContext configuration)
    {
        this._logger = logger;
        this._dataContext = configuration;
    }


    [Route("/server/console/notes")]
    [AllowAnonymous]
    [HttpGet]
    public PLSelectResult<NoteModel> Select()
    {
        var queryHelper = new PLQueryHelper(Request.Query);
        var notebook = queryHelper.GetString("notebook");
        var directory = queryHelper.GetString("directory");
        var keyword = queryHelper.GetString("keyword");
        var sort = queryHelper.GetString("sort") ?? "latest";
        var filter = queryHelper.GetString("filter") ?? "all";

        var page = queryHelper.GetInt("page") ?? 1;
        var size = queryHelper.GetInt("size") ?? 10;
        var (offset, limit) = Pagination.CalcOffset(page, size);

        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select a.*, p.username as profile_name, c.name as notebook_name,
        '/' || replace(pa.path::varchar, '.', '/') as path
from personal.notes as a
     join personal.directories pa on pa.pk = a.directory
     join personal.profiles as p on p.pk = a.profile
     join personal.notebooks as c on c.pk = a.notebook
where a.pk is not null
");
        if (!string.IsNullOrEmpty(notebook))
        {
            sqlBuilder.Append(@" and a.notebook = @notebook");
            parameters.Add("@notebook", notebook);
        }
        if (!string.IsNullOrEmpty(directory))
        {
            sqlBuilder.Append(@" and a.directory = @directory");
            parameters.Add("@directory", directory);
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

        var modelsQuery = DatabaseContextHelper.RawSqlQuery<NoteModel>(_dataContext, querySqlText, parameters);

        var models = modelsQuery.ToList();

        return new PLSelectResult<NoteModel>
        {
            Range = models,
            Count = totalCount ?? 0,
        };
    }


    [Route("/server/console/notes/{pk}")]
    [HttpGet]
    [AllowAnonymous]
    public NoteModel Get([FromRoute] string pk)
    {
        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select a.*, p.username as profile_name, c.name as notebook_name,
        '/' || replace(pa.path::varchar, '.', '/') as path
from personal.notes as a
     join personal.directories pa on pa.pk = a.directory
     join personal.profiles as p on p.pk = a.profile
     join personal.notebooks as c on c.pk = a.notebook
where a.pk = @pk
");
        parameters.Add("@pk", pk);
        var querySqlText = sqlBuilder.ToString();

        var modelsQuery = DatabaseContextHelper.RawSqlQuery<NoteModel>(_dataContext, querySqlText, parameters);

        var model = modelsQuery.FirstOrDefault();
        if (model == null)
        {
            throw new PLBizException("Data not found.");
        }

        return model;
    }
}