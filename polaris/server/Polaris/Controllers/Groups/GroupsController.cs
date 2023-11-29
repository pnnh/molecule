using System.Diagnostics;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Molecule.Models;
using Polaris.Business.Models;

namespace Polaris.Controllers.Groups;

[ApiController]
[Authorize]
public class GroupsController : ControllerBase
{
    private readonly ILogger<GroupsController> _logger;
    private readonly DatabaseContext _dataContext;

    public GroupsController(ILogger<GroupsController> logger, DatabaseContext configuration)
    {
        this._logger = logger;
        this._dataContext = configuration;
    }

    [Route("/groups/{pk}")]
    [HttpGet]
    public CommonResult<object> Read([FromRoute]string pk)
    {
        var model = _dataContext.Groups.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            return new CommonResult<object> { Code = Codes.NotFound, Message = "文章不存在" };
        }

        return new CommonResult<object> { Code = Codes.Ok, Data = model };
    }
    
    [Route("/groups/{pk}")]
    [HttpDelete]
    public CommonResult<object> Delete([FromRoute]string pk)
    {
        var model = _dataContext.Groups.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            return new CommonResult<object> { Code = Codes.NotFound, Message = "文章不存在" };
        }
        _dataContext.Groups.Remove(model);
        _dataContext.SaveChanges();

        return new CommonResult<object> { Code = Codes.Ok, Data = new
        {
            Pk = model.Pk
        } };
    }

    [Route("/groups/select")]
    public CommonResult<object> Select(int offset = 0, int limit = 10)
    {
        var models = _dataContext.Groups.Skip(offset).Take(limit).ToList();
        var totalCount = _dataContext.Groups.Count();

        return new CommonResult<object>
        {
            Code = Codes.Ok,
            Data = new
            {
                list = models,
                count = totalCount
            }
        };
    }
    
    
    [Route("/groups/select/public")]
    [AllowAnonymous]
    public CommonResult<object> SelectPublic(int offset = 0, int limit = 10)
    {
        var models = _dataContext.Groups.Skip(offset).Take(limit).ToList();
        var totalCount = _dataContext.Groups.Count();

        return new CommonResult<object>
        {
            Code = Codes.Ok,
            Data = new
            {
                list = models,
                count = totalCount
            }
        };
    }

    [Route("/groups/create")]
    [HttpPut]
    public CommonResult<WriteResponse> Create([FromBody]WriteRequest request)
    {
        var user = HttpContext.User;
        if (user.Identity == null || string.IsNullOrEmpty(user.Identity.Name))
        {
            return new CommonResult<WriteResponse>
            {
                Code = Codes.BadRequest,
                Message = "用户未登录"
            };
        }
        var model = new GroupModel()
        {
            Pk = Guid.NewGuid().ToString(),
            Title = request.Title, 
            CreateTime = DateTime.UtcNow,
            UpdateTime = DateTime.UtcNow,
            Creator = user.Identity.Name,
        };
        _dataContext.Groups.Add(model);
        _dataContext.SaveChanges();

        return new CommonResult<WriteResponse> { Code = Codes.Ok, Data = new WriteResponse { Pk = model.Pk } };
    }

    [Route("/groups/update")]
    [HttpPost]
    public CommonResult<WriteResponse> Update([FromBody]WriteRequest request)
    {
        var model = _dataContext.Groups.FirstOrDefault(m => m.Pk == request.Pk);
        if (model == null)
        {
            return new CommonResult<WriteResponse>
            {
                Code = Codes.NotFound
            };
        }

        model.Title = request.Title; 
        _dataContext.SaveChanges();

        return new CommonResult<WriteResponse> { Code = Codes.Ok, Data = new WriteResponse { Pk = model.Pk } };
    }

    public class WriteRequest
    {
        public string Pk { get; set; } = "";
        public string Title { get; set; } = "";
        public string Body { get; set; } = "";
    }
    
    public class WriteResponse
    {
        public string Pk { get; set; } = "";
    }
}