using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Molecule.Helpers;
using Polaris.Business.Models;

namespace Polaris.Controllers.Viewers;

[ApiController]
[Authorize]
public class ViewersController : ControllerBase
{
    private readonly DatabaseContext _dataContext;
    private readonly ILogger<ViewersController> _logger;

    public ViewersController(ILogger<ViewersController> logger, DatabaseContext configuration)
    {
        _logger = logger;
        _dataContext = configuration;
    }

    [Route("/viewer")]
    [AllowAnonymous]
    [HttpPost]
    public PLInsertResult Insert()
    {
        var queryHelper = new FormHelper(Request.Form);
        var channelPk = queryHelper.GetString("channel");
        var articlePk = queryHelper.GetString("article");
        var clientIp = queryHelper.GetString("client_ip");

        if (string.IsNullOrEmpty(clientIp) || string.IsNullOrEmpty(articlePk) || string.IsNullOrEmpty(channelPk))
            throw new PLBizException("参数有误");

        if (!Guid.TryParse(articlePk, out var articleGuid)) throw new PLBizException("参数有误");

        if (!Guid.TryParse(channelPk, out var channelGuid)) throw new PLBizException("参数有误");

        var clientAddress = IPAddress.Parse(clientIp);

        using (var transaction = _dataContext.Database.BeginTransaction())
        {
            var viewer = _dataContext.Viewers.FirstOrDefault(m => m.Source == clientAddress
                                                                  && m.Target == articleGuid && m.Direction == "uta");
            if (viewer != null)
            {
                if (viewer.UpdateTime.AddHours(24) > DateTime.UtcNow)
                    // 24小时内只能更新一次
                    return new PLInsertResult { Pk = viewer.Uid };

                _dataContext.Attach(viewer);
                viewer.UpdateTime = DateTime.UtcNow;
                _dataContext.Entry(viewer).Property(p => p.UpdateTime).IsModified = true;
            }
            else
            {
                var model = new ViewerModel
                {
                    Uid = Guid.NewGuid(),
                    Direction = "uta",
                    Source = clientAddress,
                    Target = articleGuid,
                    CreateTime = DateTime.UtcNow,
                    UpdateTime = DateTime.UtcNow,
                    Channel = channelGuid
                };
                _dataContext.Viewers.Add(model);
            }

            var articleView = _dataContext.Relations.FirstOrDefault(m => m.Source == channelGuid &&
                                                                         m.Target == articleGuid &&
                                                                         m.Direction == "cta");
            if (articleView == null)
            {
                throw new PLBizException("更新阅读数量出错");
            }

            _dataContext.Attach(articleView);
            articleView.Discover += 1;
            _dataContext.Entry(articleView).Property(p => p.Discover).IsModified = true;

            _dataContext.SaveChanges();

            transaction.Commit();
        }

        return new PLInsertResult { Pk = Guid.Empty };
    }
}