using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Molecule.Models;

namespace Polaris.Controllers;

[ApiController]
public class HomeController : ControllerBase
{
    private readonly ILogger<HomeController> logger;


    public HomeController(ILogger<HomeController> logger)
    {
        this.logger = logger;
    }

    [Route("/")]
    public string Index()
    {
        return "Polaris业务接口服务";
    }

}