using System.Net.Mime;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using Polaris.Business.Models;
using Polaris.Business.Services; 

namespace Polaris;

public class PolarisApplication
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var services = builder.Services;

        builder.Logging.ClearProviders().AddSimpleConsole(options =>
        {
            options.SingleLine = false;
            options.IncludeScopes = true;
            options.UseUtcTimestamp = true;
        });
        var configFileName = "appsettings.json";
        var envName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        if (!string.IsNullOrEmpty(envName) && envName != "Production") configFileName = $"appsettings.{envName}.json";
        builder.Configuration.AddJsonFile(configFileName, false, true);

        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All);
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower;
        });

        builder.Services.AddScoped<ModelService>();

        var connString = builder.Configuration.GetConnectionString("Default");

        var dbDataSource = new NpgsqlDataSourceBuilder(connString).Build();

        builder.Services.AddDbContext<DatabaseContext>(options =>
        {
            options.UseNpgsql(dbDataSource,
                    x => x.MigrationsHistoryTable("migrations_history"))
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors();
        }, ServiceLifetime.Transient);

        // var redisConn = builder.Configuration.GetSection("RedisConn:Url").Value;
        // if (redisConn == null)
        //     throw new Exception("REDIS_CONN_URL is not set");
        // var multiplexer = ConnectionMultiplexer.Connect(redisConn);
        // builder.Services.AddSingleton<IConnectionMultiplexer>(multiplexer);

        var secretKey = builder.Configuration["Jwt:Secret"];
        if (secretKey == null)
            throw new Exception("JWT_SECRET is not set");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

        builder.Services.AddAuthentication()
            .AddScheme<AuthenticationSchemeOptions, OAuth2AuthenticationHandler>(
                OAuth2AuthenticationDefaults.AuthenticationScheme, null);
        builder.Services.AddExceptionHandler<CustomExceptionHandler>();

        var app = builder.Build();

        // var pathBase = app.Configuration["PathBase"] ?? "/";
        // app.UsePathBase(new PathString(pathBase));
        
        if (!app.Environment.IsDevelopment()) app.UseExceptionHandler("/Home/Error");

        app.UseStaticFiles();
        app.UseRouting();
        app.UseAuthentication();

        app.MapControllers();

        app.UseAuthorization();

        app.Run();
    }

}

public class CustomExceptionHandler : IExceptionHandler
{
    private readonly ILogger<CustomExceptionHandler> logger;
    public CustomExceptionHandler(ILogger<CustomExceptionHandler> logger)
    {
        this.logger = logger;
    }
    public ValueTask<bool> TryHandleAsync(
        HttpContext context,
        Exception exception,
        CancellationToken cancellationToken)
    { 
        var statusCode = (int)PLCodes.Ok;
        var publicMessage = "出现异常";

        var exceptionHandlerPathFeature =
            context.Features.Get<IExceptionHandlerPathFeature>();

        if (exceptionHandlerPathFeature is { Error: PLBizException bizExp })
        {
            statusCode = bizExp.Code;
            publicMessage = bizExp.PublicMessage;
        }

        context.Response.StatusCode = StatusCodes.Status200OK;
        context.Response.ContentType = MediaTypeNames.Application.Json;

        if (exceptionHandlerPathFeature != null)
            logger.LogInformation($"message={exceptionHandlerPathFeature.Error.Message}");

        var commonResult = new PLExceptionResult
        {
            Code = statusCode,
            Message = publicMessage
        };
        var jsonResponse = JsonSerializer.Serialize(commonResult);

        var streamWriter = new StreamWriter(context.Response.Body);
        streamWriter.Write(jsonResponse);

        return ValueTask.FromResult(false);
    }
}