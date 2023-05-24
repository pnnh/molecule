


using System.Net;
using Gliese.Models;
using Microsoft.EntityFrameworkCore;
using Gliese.Services;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.FileProviders;

namespace Gliese
{
    public class Gliese
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args); 
            var services = builder.Services;

            builder.Logging.ClearProviders().AddSimpleConsole(options =>
            {
                options.SingleLine = true;
                options.IncludeScopes = true;
                options.UseUtcTimestamp = true;
            });
            
            builder.Services.AddControllers().AddJsonOptions(options =>
            options.JsonSerializerOptions.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All));
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var connString = builder.Configuration.GetConnectionString("Default");

            builder.Services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseNpgsql(connString);
            });

            services.AddMemoryCache();

            services.AddAuthentication("BasicAuthentication")
                .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>
                ("BasicAuthentication", null);

            var app = builder.Build();

            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=31536000");
                },
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "data")),
                RequestPath = new PathString("/data")
            });
            app.UseRouting();
            app.UseAuthentication();

            app.MapControllers();

            app.UseAuthorization();

            app.Run();
        }

    }
}

