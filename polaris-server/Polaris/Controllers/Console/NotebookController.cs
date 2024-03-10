using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Molecule.Helpers;
using Molecule.Models;
using Polaris.Business.Helpers;
using Polaris.Business.Models;
using Polaris.Business.Models.Personal;

namespace Polaris.Controllers.Console;

[ApiController]
public class NotebookContentController : ControllerBase
{
    private readonly DatabaseContext _dataContext;
    private readonly ILogger<NoteContentController> _logger;

    public NotebookContentController(ILogger<NoteContentController> logger, DatabaseContext configuration)
    {
        _logger = logger;
        _dataContext = configuration;
    }


    [Route("/server/console/notebooks")]
    [AllowAnonymous]
    [HttpGet]
    public MSelectResult<NotebookModel> Select()
    {
        var queryHelper = new MQueryHelper(Request.Query);
        var profile = queryHelper.GetString("profile");

        var profileModel = _dataContext.Accounts.FirstOrDefault(x => x.Username == profile);
        if (profileModel == null) throw new PLBizException("用户不存在");

        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select a.*
from personal.notebooks as a
where a.profile = @profile
");
        parameters.Add("@profile", profileModel.Username);
        var querySqlText = sqlBuilder.ToString();

        var modelsQuery = DatabaseContextHelper.RawSqlQuery<NotebookModel>(_dataContext, querySqlText, parameters);

        var models = modelsQuery.ToList();

        return new MSelectResult<NotebookModel>
        {
            Range = models,
            Count = models.Count
        };
    }
}