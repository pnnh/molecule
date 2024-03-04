using System.Data.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Molecule.Helpers;
using Polaris.Business.Models;

namespace Polaris.Controllers.Channels;

[ApiController]
[Authorize]
public class ChannelsController : ControllerBase
{
    private readonly DatabaseContext _dataContext;
    private readonly ILogger<ChannelsController> _logger;

    public ChannelsController(ILogger<ChannelsController> logger, DatabaseContext configuration)
    {
        _logger = logger;
        _dataContext = configuration;
    }

    [Route("/server/channels/{pk}")]
    [HttpGet]
    [AllowAnonymous]
    public ChannelModel Get([FromRoute] string pk)
    {
        if (!Guid.TryParse(pk, out var uid)) throw new PLBizException("频道不存在");
        var model = _dataContext.Channels.FirstOrDefault(m => m.Uid == uid);
        if (model == null) throw new PLBizException("频道不存在");

        return model;
    }

    [Route("/server/channel/{pk}")]
    [HttpDelete]
    public async Task<PLDeleteResult> Delete([FromRoute] string pk)
    {
        if (!Guid.TryParse(pk, out var uid)) throw new PLBizException("频道不存在");
        var model = await _dataContext.Channels.FirstOrDefaultAsync(m => m.Uid == uid);
        if (model == null) throw new PLBizException("频道不存在");
        _dataContext.Channels.Remove(model);
        var changes = _dataContext.SaveChanges();

        return new PLDeleteResult { Changes = changes };
    }

    [Route("/server/channels")]
    [HttpGet]
    [AllowAnonymous]
    public PLSelectResult<ChannelModel> Select()
    {
        var queryHelper = new MQueryHelper(Request.Query);
        var page = queryHelper.GetInt("page") ?? 1;
        var size = queryHelper.GetInt("size") ?? 10;
        var (offset, limit) = MPagination.CalcOffset(page, size);
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
        if (user.Identity == null || string.IsNullOrEmpty(user.Identity.Name)) throw new PLBizException("用户未登录");
        var model = new ChannelModel
        {
            Uid = Guid.NewGuid(),
            Name = request.Title,
            Title = request.Title,
            CreateTime = DateTime.UtcNow,
            UpdateTime = DateTime.UtcNow,
            Owner = Guid.Empty,
            Description = request.Description,
            Image = request.Image
        };
        await _dataContext.Channels.AddAsync(model);
        await _dataContext.SaveChangesAsync();

        return new PLInsertResult { Pk = model.Uid };
    }

    [Route("/server/channel/{pk}")]
    [HttpPut]
    public async Task<PLUpdateResult> Update([FromBody] ChannelModel request)
    {
        var model = await _dataContext.Channels.FirstOrDefaultAsync(m => m.Uid == request.Uid);
        if (model == null) throw new PLBizException("频道不存在");

        model.Title = request.Title;
        var changes = _dataContext.SaveChanges();

        return new PLUpdateResult { Changes = changes };
    }
}