
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Molecule.Models;
using Polaris.Business.Models;
using System.Data.Entity;
using Polaris.Business.Helpers;

namespace Polaris.Controllers.Channels;

[ApiController]
[Authorize]
public class ChannelsController : ControllerBase
{
    private readonly ILogger<ChannelsController> _logger;
    private readonly DatabaseContext _dataContext;

    public ChannelsController(ILogger<ChannelsController> logger, DatabaseContext configuration)
    {
        this._logger = logger;
        this._dataContext = configuration;
    }

    [Route("/server/channels/{pk}")]
    [HttpGet]
    [AllowAnonymous]
    public ChannelModel Get([FromRoute] string pk)
    {
        var model = _dataContext.Channels.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            throw new PLBizException("频道不存在");
        }

        return model;
    }

    [Route("/server/channel/{pk}")]
    [HttpDelete]
    public async Task<PLDeleteResult> Delete([FromRoute] string pk)
    {
        var model = await _dataContext.Channels.FirstOrDefaultAsync(m => m.Pk == pk);
        if (model == null)
        {
            throw new PLBizException("频道不存在");
        }
        _dataContext.Channels.Remove(model);
        var changes = _dataContext.SaveChanges();

        return new PLDeleteResult { Changes = changes };
    }

    [Route("/server/channels")]
    [HttpGet]
    [AllowAnonymous]
    public PLSelectResult<ChannelModel> Select()
    {
        var queryHelper = new PLQueryHelper(Request.Query);
        var page = queryHelper.GetInt("page") ?? 1;
        var size = queryHelper.GetInt("size") ?? 10;
        var (offset, limit) = Pagination.CalcOffset(page, size);
        var models = _dataContext.Channels.OrderByDescending(o => o.UpdateTime).Skip(offset).Take(limit).ToList();
        var totalCount = _dataContext.Channels.Count();

        return new PLSelectResult<ChannelModel>
        {
            Range = models,
            Count = totalCount
        };
    }

    [Route("/server/channel")]
    [HttpPost]
    public async Task<PLInsertResult> Insert([FromBody] ChannelModel request)
    {
        var user = HttpContext.User;
        if (user.Identity == null || string.IsNullOrEmpty(user.Identity.Name))
        {
            throw new PLBizException("用户未登录");
        }
        var model = new ChannelModel()
        {
            Pk = Guid.NewGuid().ToString(),
            Name = request.Title,
            Title = request.Title,
            CreateTime = DateTime.UtcNow,
            UpdateTime = DateTime.UtcNow,
            Creator = user.Identity.Name,
            Description = request.Description,
            Image = request.Image
        };
        await _dataContext.Channels.AddAsync(model);
        await _dataContext.SaveChangesAsync();

        return new PLInsertResult { Pk = model.Pk };
    }

    [Route("/server/channel/{pk}")]
    [HttpPut]
    public async Task<PLUpdateResult> Update([FromBody] ChannelModel request)
    {
        var model = await _dataContext.Channels.FirstOrDefaultAsync(m => m.Pk == request.Pk);
        if (model == null)
        {
            throw new PLBizException("频道不存在");
        }

        model.Title = request.Title;
        var changes = _dataContext.SaveChanges();

        return new PLUpdateResult { Changes = changes };
    }
}