
using Microsoft.EntityFrameworkCore;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using Polaris.Business.Models;
using StackExchange.Redis;
using Npgsql;
using Polaris.Business.Services;
using Microsoft.AspNetCore.Diagnostics;
using System.Net.Mime;
using System.Text.Json;

namespace Polaris
{
    public class PolarisApplication
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Logging.ClearProviders().AddSimpleConsole(options =>
            {
                options.SingleLine = false;
                options.IncludeScopes = true;
                options.UseUtcTimestamp = true;
            });

            var services = builder.Services;

            builder.Logging.ClearProviders().AddSimpleConsole(options =>
            {
                options.SingleLine = true;
                options.IncludeScopes = true;
                options.UseUtcTimestamp = true;
            });
            builder.Configuration.AddJsonFile("runtime/appsettings.json", optional: false, reloadOnChange: true);

            builder.Services.AddControllers().AddJsonOptions(options =>
            options.JsonSerializerOptions.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All));

            var connString = builder.Configuration.GetConnectionString("Default");

            var dbDataSource = new NpgsqlDataSourceBuilder(connString).Build();

            builder.Services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseNpgsql(dbDataSource);
            });

            var redisConn = builder.Configuration.GetSection("RedisConn:Url").Value;
            if (redisConn == null)
                throw new Exception("REDIS_CONN_URL is not set");
            var multiplexer = ConnectionMultiplexer.Connect(redisConn);
            builder.Services.AddSingleton<IConnectionMultiplexer>(multiplexer);

            var secretKey = builder.Configuration["Jwt:Secret"];
            if (secretKey == null)
                throw new Exception("JWT_SECRET is not set");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            builder.Services.AddAuthentication()
                .AddScheme<AuthenticationSchemeOptions, OAuth2AuthenticationHandler>(
                    OAuth2AuthenticationDefaults.AuthenticationScheme, null);

            var app = builder.Build();


            app.UseExceptionHandler(exceptionHandlerApp =>
            {
                exceptionHandlerApp.Run(async context =>
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
                        app.Logger.LogInformation($"message={exceptionHandlerPathFeature.Error.Message}");

                    var commonResult = new PLExceptionResult
                    {
                        Code = statusCode,
                        Message = publicMessage
                    };
                    var jsonResponse = JsonSerializer.Serialize(commonResult);

                    await context.Response.WriteAsync(jsonResponse);
                });
            });

            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();

            app.MapControllers();

            app.UseAuthorization();

            app.Run();
        }

    }
}

