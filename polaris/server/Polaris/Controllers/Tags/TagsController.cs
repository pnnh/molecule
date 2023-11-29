using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Polaris.Business.Models;
using Molecule.Models;

namespace Polaris.Controllers.Tags;

[ApiController]
[Authorize]
public class TagsController : ControllerBase
{
    private readonly ILogger<TagsController> _logger;
    private readonly DatabaseContext _dataContext;

    public TagsController(ILogger<TagsController> logger, DatabaseContext configuration)
    {
        this._logger = logger;
        this._dataContext = configuration;
    }

    [Route("/server/tags/{pk}")]
    [HttpGet]
    public CommonResult<object> Read([FromRoute] string pk)
    {
        var model = _dataContext.Tags.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            return new CommonResult<object> { Code = Codes.NotFound, Message = "文章不存在" };
        }

        return new CommonResult<object> { Code = Codes.Ok, Data = model };
    }

    [Route("/server/tags/{pk}")]
    [HttpDelete]
    public CommonResult<object> Delete([FromRoute] string pk)
    {
        var model = _dataContext.Tags.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            return new CommonResult<object> { Code = Codes.NotFound, Message = "文章不存在" };
        }
        _dataContext.Tags.Remove(model);
        _dataContext.SaveChanges();

        return new CommonResult<object>
        {
            Code = Codes.Ok,
            Data = new
            {
                Pk = model.Pk
            }
        };
    }

    [Route("/server/tags/select")]
    public CommonResult<object> Select(int offset = 0, int limit = 10)
    {
        var models = _dataContext.Tags.Skip(offset).Take(limit).ToList();
        var totalCount = _dataContext.Tags.Count();

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


    [Route("/server/tags/select/public")]
    [AllowAnonymous]
    public CommonResult<object> SelectPublic(int offset = 0, int limit = 10)
    {
        var models = _dataContext.Tags.Skip(offset).Take(limit).ToList();
        var totalCount = _dataContext.Tags.Count();

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

    [Route("/tags/create")]
    [HttpPut]
    public CommonResult<WriteResponse> Create([FromBody] WriteRequest request)
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
        var model = new TagModel()
        {
            Pk = Guid.NewGuid().ToString(),
            Title = request.Title,
            CreateTime = DateTime.UtcNow,
            UpdateTime = DateTime.UtcNow,
            Creator = user.Identity.Name,
        };
        _dataContext.Tags.Add(model);
        _dataContext.SaveChanges();

        return new CommonResult<WriteResponse> { Code = Codes.Ok, Data = new WriteResponse { Pk = model.Pk } };
    }

    [Route("/server/tags/update")]
    [HttpPost]
    public CommonResult<WriteResponse> Update([FromBody] WriteRequest request)
    {
        var model = _dataContext.Tags.FirstOrDefault(m => m.Pk == request.Pk);
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