using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Molecule.Helpers;
using Polaris.Business.Models;
using Polaris.Business.Models.Polaris;

namespace Polaris.Controllers.Articles;

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

    [Route("/polaris/channels/{channel}/articles/{article}/view")]
    [AllowAnonymous]
    [HttpPost]
    public async Task<PModifyResult> Insert([FromRoute] string channel, [FromRoute] string article)
    {
        var queryHelper = await JsonHelper.NewAsync(Request.Body);
        var clientIp = queryHelper.GetString("ip");

        if (string.IsNullOrEmpty(clientIp) || string.IsNullOrEmpty(channel) || string.IsNullOrEmpty(article)) {
            return new PModifyResult { Uid = Guid.Empty };
        }

        var channelUid = MIDHelper.Base58.GuidDecode(channel);
        var articleUid = MIDHelper.Base58.GuidDecode(article);

        if (channelUid == null || articleUid == null) {
            return new PModifyResult { Uid = Guid.Empty };
        }

        if (!IPAddress.TryParse(clientIp, out var clientAddress))
        {
            //throw new PLBizException("IP地址有误：" + clientIp);
            return new PModifyResult { Uid = Guid.Empty };
        }

        await using (var transaction = await _dataContext.Database.BeginTransactionAsync())
        {
            var viewer = _dataContext.Viewers.FirstOrDefault(m => m.Source == clientAddress
                                                                  && m.Target == articleUid && m.Direction == "uta");
            if (viewer != null)
            {
                if (viewer.UpdateTime.AddHours(24) > DateTime.UtcNow)
                    // 24小时内只能更新一次
                    return new PModifyResult { Uid = viewer.Uid };

                _dataContext.Attach(viewer);
                viewer.UpdateTime = DateTime.UtcNow;
                _dataContext.Entry(viewer).Property(p => p.UpdateTime).IsModified = true;
            }
            else
            {
                var model = new PSViewerModel
                {
                    Uid = Guid.NewGuid(),
                    Direction = "uta",
                    Source = clientAddress,
                    Target = articleUid.Value,
                    CreateTime = DateTime.UtcNow,
                    UpdateTime = DateTime.UtcNow,
                    Channel = channelUid.Value
                };
                _dataContext.Viewers.Add(model);
            }

            var articleView = _dataContext.PSArticles.FirstOrDefault(m => m.Uid == articleUid.Value);
            if (articleView == null)
            {
                throw new PLBizException("更新阅读数量出错");
            }

            _dataContext.Attach(articleView);
            articleView.Discover += 1;
            _dataContext.Entry(articleView).Property(p => p.Discover).IsModified = true;

            await _dataContext.SaveChangesAsync();

            await transaction.CommitAsync();
        }

        return new PModifyResult { Uid = Guid.Empty };
    }
}