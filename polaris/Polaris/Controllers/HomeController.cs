using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Molecule.Helpers;
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
        for(var i = 0; i<100;i++)
        {
            var name = MIDHelper.Base58.GuidEncode(Guid.NewGuid());
            logger.LogInformation($"=========={name}==={name.Length}");
        }
        return "Polaris业务接口服务";
    }

}