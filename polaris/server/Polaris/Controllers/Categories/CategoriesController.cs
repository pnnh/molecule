using System.Diagnostics;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Molecule.Models;
using Polaris.Business.Models;

namespace Polaris.Controllers.Categories;

[ApiController]
[Authorize]
public class CategoriesController : ControllerBase
{
    private readonly ILogger<CategoriesController> _logger;
    private readonly DatabaseContext _dataContext;

    public CategoriesController(ILogger<CategoriesController> logger, DatabaseContext configuration)
    {
        this._logger = logger;
        this._dataContext = configuration;
    }

    [Route("/categories/{pk}")]
    [HttpGet]
    public CommonResult<object> Get([FromRoute]string pk)
    {
        var model = _dataContext.Categories.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            return new CommonResult<object> { Code = Codes.NotFound, Message = "文章不存在" };
        }

        return new CommonResult<object> { Code = Codes.Ok, Data = model };
    }
    
    [Route("/categories/{pk}")]
    [HttpDelete]
    public CommonResult<object> Delete([FromRoute]string pk)
    {
        var model = _dataContext.Categories.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            return new CommonResult<object> { Code = Codes.NotFound, Message = "文章不存在" };
        }
        _dataContext.Categories.Remove(model);
        _dataContext.SaveChanges();

        return new CommonResult<object> { Code = Codes.Ok, Data = new
        {
            Pk = model.Pk
        } };
    }

    [Route("/categories/select")]
    public CommonResult<object> Select(int offset = 0, int limit = 10)
    {
        var models = _dataContext.Categories.Skip(offset).Take(limit).ToList();
        var totalCount = _dataContext.Categories.Count();

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
    
    
    [Route("/categories/select/public")]
    [AllowAnonymous]
    public CommonResult<object> SelectPublic(int offset = 0, int limit = 10)
    {
        var models = _dataContext.Categories.Skip(offset).Take(limit).ToList();
        var totalCount = _dataContext.Categories.Count();

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
    
    [Route("/categories/create")]
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
        var model = new CategoryModel()
        {
            Pk = Guid.NewGuid().ToString(),
            Title = request.Title, 
            CreateTime = DateTime.UtcNow,
            UpdateTime = DateTime.UtcNow,
            Creator = user.Identity.Name,
        };
        _dataContext.Categories.Add(model);
        _dataContext.SaveChanges();

        return new CommonResult<WriteResponse> { Code = Codes.Ok, Data = new WriteResponse { Pk = model.Pk } };
    }

    [Route("/categories/update")]
    [HttpPost]
    public CommonResult<WriteResponse> Update([FromBody]WriteRequest request)
    {
        var model = _dataContext.Categories.FirstOrDefault(m => m.Pk == request.Pk);
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