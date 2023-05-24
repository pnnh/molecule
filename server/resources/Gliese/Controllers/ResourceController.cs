using Microsoft.AspNetCore.Mvc;
using Gliese.Models;
using Gliese.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;

namespace Gliese.Controllers;

[Authorize()]
[ApiController]
public class ResourceController : ControllerBase
{
    private readonly ILogger<ResourceController> _logger;
    private readonly DatabaseContext _dataContext;
    private readonly IConfiguration _configuration;

    public ResourceController(ILogger<ResourceController> logger, DatabaseContext databaseContext,
        IConfiguration _configuration)
    {
        this._logger = logger;
        this._dataContext = databaseContext;
        this._configuration = _configuration;
    }

    [Route("/resources/insert")]
    [HttpPost]
    public async Task<CommonResult<string>> Insert(string title, List<IFormFile> files)
    {
        var user = HttpContext.User; 
        _logger.LogDebug($"user name: {user.Identity?.Name}");
        if (user.Identity == null || string.IsNullOrEmpty(user.Identity.Name))
        {
            return new CommonResult<string>
            {
                Code = Codes.BadRequest,
                Message = "用户未登录"
            };
        }
        var userInfo = _dataContext.Accounts.FirstOrDefault(a => a.Account == user.Identity.Name);
        if (userInfo == null)
        {
            return new CommonResult<string>
            {
                Code = Codes.BadRequest,
                Message = "获取用户信息出错: 用户不存在"
            };
        }
        
        var storagePath = _configuration["Storage:Default"];
        
        if (storagePath == null)
        {
            return new CommonResult<string> { Code = Codes.Error };
        }
        var fileInfo = await FileUtils.SaveFiles(storagePath, files);
        if (fileInfo == null)
        {
            return new CommonResult<string> { Code = Codes.Error };
        }

        var provider = new FileExtensionContentTypeProvider();
        if (!provider.TryGetContentType(fileInfo.FileName, out var contentType))
        {
            contentType = "application/octet-stream";
        }
        var pk =        Guid.NewGuid().ToString();
        var model = new ResourceTable()
        {
            Pk = pk,
            Title = title,
            CreateTime = DateTime.UtcNow,
            UpdateTime = DateTime.UtcNow,
            Creator = userInfo.Pk,
            Size = fileInfo.FileSize,
            Uri = fileInfo.FilePath,
            Mime = contentType
        };
        _dataContext.Resources.Add(model);
        await _dataContext.SaveChangesAsync();

        return new CommonResult<string> { Code = Codes.Ok };
    }
    
    [Route("/resources/delete")]
    public CommonResult<string> Delete(string pk)
    {
        var model = _dataContext.Resources.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            return new CommonResult<string> { Code = Codes.NotFound, Message = "资源不存在" };
        }
        _dataContext.Resources.Remove(model);
        _dataContext.SaveChanges();

        return new CommonResult<string> { Code = Codes.Ok };
    }
    
    [Route("/resources/update")]
    public CommonResult<string> Update(string pk, string title)
    {
        var model = _dataContext.Resources.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            return new CommonResult<string> { Code = Codes.NotFound, Message = "资源不存在" };
        }
        model.Title = title;
        _dataContext.SaveChanges();

        return new CommonResult<string> { Code = Codes.Ok };
    }
    
    [Route("/resources/get")]
    public CommonResult<ResourceTable> Get(string pk)
    {
        var model = _dataContext.Resources.FirstOrDefault(m => m.Pk == pk);
        if (model == null)
        {
            return new CommonResult<ResourceTable> { Code = Codes.NotFound, Message = "资源不存在" };
        }

        return new CommonResult<ResourceTable> { Code = Codes.Ok, Data = model };
    }

    [Route("/resources/select")]
    public SelectResult<ResourceTable> Select(int offset = 0, int limit = 10)
    {
        var models = _dataContext.Resources.Skip(offset).Take(limit).ToList();
        
        var totalCount = _dataContext.Resources.Count();

        return new SelectResult<ResourceTable>
        {
            Code = Codes.Ok,
            Data = new SelectData<ResourceTable>
            {
                List = models,
                Count = totalCount
            }
        };
    }
}