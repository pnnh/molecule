using System.Diagnostics;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Polaris.Utils;
using System.Text;
using Molecule.Models;
using Polaris.Business.Models;
using Molecule.Helpers;
using System.Data.Entity;

namespace Polaris.Controllers.Viewers;

[ApiController]
[Authorize]
public class ViewersController : ControllerBase
{
    private readonly ILogger<ViewersController> _logger;
    private readonly DatabaseContext _dataContext;

    public ViewersController(ILogger<ViewersController> logger, DatabaseContext configuration)
    {
        this._logger = logger;
        this._dataContext = configuration;
    }

    [Route("/server/viewer")]
    [AllowAnonymous]
    [HttpPost]
    public PLInsertResult Insert()
    {
        var queryHelper = new FormHelper(Request.Form);
        var channelPk = queryHelper.GetString("channel");
        var articlePk = queryHelper.GetString("article");
        var clientIp = queryHelper.GetString("client_ip");

        if (string.IsNullOrEmpty(clientIp) || string.IsNullOrEmpty(articlePk) || string.IsNullOrEmpty(channelPk))
        {
            throw new PLBizException("参数有误");
        }

        using (var transaction = _dataContext.Database.BeginTransaction())
        {
            var viewer = _dataContext.Viewers.FirstOrDefault(m => m.Source == clientIp
            && m.Target == articlePk && m.Direction == "uta");
            if (viewer != null)
            {
                if (viewer.UpdateTime.AddHours(24) > DateTime.UtcNow)
                { 
                    // 24小时内只能更新一次
                    return new PLInsertResult { Pk = viewer.Pk };
                }
                else
                {
                    _dataContext.Attach(viewer);
                    viewer.UpdateTime = DateTime.UtcNow;
                    _dataContext.Entry(viewer).Property(p => p.UpdateTime).IsModified = true;
                }
            }
            else
            {
                var model = new ViewerModel
                {
                    Pk = Guid.NewGuid().ToString(),
                    Direction = "uta",
                    Source = clientIp,
                    Target = articlePk,
                    CreateTime = DateTime.UtcNow,
                    UpdateTime = DateTime.UtcNow,
                    Channel = channelPk,
                };
                _dataContext.Viewers.Add(model);
            }

            var articleView = _dataContext.Relations.FirstOrDefault(m => m.Source == channelPk &&
                m.Target == articlePk && m.Direction == "cta");
            if (articleView == null)
            {
                throw new PLBizException("更新阅读数量出错");
            }
            else
            {
                _dataContext.Attach(articleView);
                articleView.Discover += 1;
                _dataContext.Entry(articleView).Property(p => p.Discover).IsModified = true;
            }

            _dataContext.SaveChanges();

            transaction.Commit();
        }

        return new PLInsertResult { Pk = "" };
    }
}