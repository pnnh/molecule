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
public class NotebookContentController : ControllerBase
{
    private readonly ILogger<NoteContentController> _logger;
    private readonly DatabaseContext _dataContext;

    public NotebookContentController(ILogger<NoteContentController> logger, DatabaseContext configuration)
    {
        this._logger = logger;
        this._dataContext = configuration;
    }


    [Route("/server/console/notebooks")]
    [AllowAnonymous]
    [HttpGet]
    public PLSelectResult<NotebookModel> Select()
    {
        var queryHelper = new MQueryHelper(Request.Query);
        var profile = queryHelper.GetString("profile");

        var profileModel = _dataContext.Profiles.FirstOrDefault(x => x.Username == profile);
        if (profileModel == null)
        {
            throw new PLBizException("用户不存在");
        }

        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select a.*
from personal.notebooks as a
where a.profile = @profile
");
        parameters.Add("@profile", profileModel.Pk);
        var querySqlText = sqlBuilder.ToString();

        var modelsQuery = DatabaseContextHelper.RawSqlQuery<NotebookModel>(_dataContext, querySqlText, parameters);

        var models = modelsQuery.ToList();

        return new PLSelectResult<NotebookModel>
        {
            Range = models,
            Count = models.Count,
        };
    }
}