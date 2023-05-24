using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Gliese.Models;

namespace Gliese.Controllers;

[ApiController]
public class HomeController : ControllerBase
{
    public HomeController()
    {
    }

    [Route("/")]
    public CommonResult<object> Index(int page = 1)
    {
        return new CommonResult<object> { Code = Codes.Ok, Message = "业务接口服务" };
    }

}