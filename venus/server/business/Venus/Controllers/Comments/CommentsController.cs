using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Molecule.Models;
using Venus.Business.Models;

namespace Venus.Controllers.Comments;

[ApiController]
[Authorize]
public class CommentsController : ControllerBase
{
    private readonly ILogger<CommentsController> _logger;
    private readonly DatabaseContext _dataContext;

    public CommentsController(ILogger<CommentsController> logger, DatabaseContext configuration)
    {
        this._logger = logger;
        this._dataContext = configuration;
    }

    [Route("/comments/{pk}")]
    [HttpGet]
    public CommonResult<object> Get([FromRoute] string pk)
    {
        var model = _dataContext.Comments.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            return new CommonResult<object> { Code = Codes.NotFound, Message = "文章不存在" };
        }

        return new CommonResult<object> { Code = Codes.Ok, Data = model };
    }

    [Route("/comments/{pk}")]
    [HttpDelete]
    public CommonResult<object> Delete([FromRoute] string pk)
    {
        var model = _dataContext.Comments.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            return new CommonResult<object> { Code = Codes.NotFound, Message = "文章不存在" };
        }
        _dataContext.Comments.Remove(model);
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

    [Route("/comments/select")]
    public CommonResult<object> Select(int offset = 0, int limit = 10)
    {
        var models = _dataContext.Comments.Skip(offset).Take(limit).ToList();
        var totalCount = _dataContext.Comments.Count();

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


    [Route("/comments/select/public")]
    [AllowAnonymous]
    public CommonResult<object> SelectPublic(int offset = 0, int limit = 10)
    {
        var models = _dataContext.Comments.Skip(offset).Take(limit).ToList();
        var totalCount = _dataContext.Comments.Count();

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

    [Route("/comments/create")]
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
        var model = new CommentModel()
        {
            Pk = Guid.NewGuid().ToString(),
            Title = request.Title,
            CreateTime = DateTime.UtcNow,
            UpdateTime = DateTime.UtcNow,
            Creator = user.Identity.Name,
        };
        _dataContext.Comments.Add(model);
        _dataContext.SaveChanges();

        return new CommonResult<WriteResponse> { Code = Codes.Ok, Data = new WriteResponse { Pk = model.Pk } };
    }

    [Route("/comments/update")]
    [HttpPost]
    public CommonResult<WriteResponse> Update([FromBody] WriteRequest request)
    {
        var model = _dataContext.Comments.FirstOrDefault(m => m.Pk == request.Pk);
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
    }

    public class WriteResponse
    {
        public string Pk { get; set; } = "";
    }
}