using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Polaris.Business.Models;


namespace Polaris.Business.Services;

public abstract class OAuth2AuthenticationDefaults
{
    public const string AuthenticationScheme = "OAuth2";
}

internal class OAuth2IntrospectResult
{
    public bool Active { get; set; } = false;
    [JsonProperty("client_id")]
    public string ClientId { get; set; } = "";

    [JsonProperty("username")]
    public string Username { get; set; } = "";

    public long Exp { get; set; }
    public long Iat { get; set; }
    public string? Iss { get; set; }
    public string? Sub { get; set; }
    public string? Aud { get; set; }
    public string? Scope { get; set; }
}

public class OAuth2AuthenticationClient : IIdentity
{
    public string? AuthenticationType { get; set; }
    public bool IsAuthenticated { get; set; }
    public string? Name { get; init; }
}

public class OAuth2AuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly DatabaseContext _databaseContext;
    private readonly IConfiguration _configuration;


    public OAuth2AuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        DatabaseContext databaseContext,
        IConfiguration configuration) : base(options, logger, encoder)
    {
        _databaseContext = databaseContext;
        _configuration = configuration;
    }

    AuthenticateResult debugAuth(string? basicToken)
    {
        if (basicToken == null)
            return AuthenticateResult.Fail("Invalid Authorization Header");
        var decodedToken = Encoding.UTF8.GetString(Convert.FromBase64String(basicToken));
        var username = decodedToken.Split(":")[0];
        username = $"debug-{username??"anonymous"}";
        var client = new OAuth2AuthenticationClient()
        {
            AuthenticationType = OAuth2AuthenticationDefaults.AuthenticationScheme,
            IsAuthenticated = true,
            Name = username
        };
        var claims = new List<Claim>
                {
                    new(ClaimTypes.Name, username)
                };
        var claimsPrincipal = new ClaimsPrincipal(new ClaimsIdentity(client, claims));

        return AuthenticateResult.Success(new AuthenticationTicket(claimsPrincipal, Scheme.Name));

    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.ContainsKey("Authorization"))
        {
            return AuthenticateResult.NoResult();
        }
        var authorizationHeader = Request.Headers["Authorization"].ToString();

#if DEBUG 
        if (authorizationHeader.StartsWith("Basic", StringComparison.OrdinalIgnoreCase))
        {
            var basicToken = authorizationHeader.Substring("Basic ".Length).Trim();
            return debugAuth(basicToken);
        }
#endif

        if (!authorizationHeader.StartsWith("Bearer", StringComparison.OrdinalIgnoreCase))
            return AuthenticateResult.Fail("Invalid Authorization Header");

        var accessToken = authorizationHeader.Substring("Bearer ".Length).Trim();

        if (string.IsNullOrEmpty(accessToken))
        {
            return AuthenticateResult.Fail("Missing Authorization Header");
        }

        var accountModel = _databaseContext.Accounts.FirstOrDefault(o =>
            o.AccessToken == accessToken);

        if (accountModel == null || accountModel.TokenExpire > DateTimeOffset.Now ||
            accountModel.SyncTime < DateTimeOffset.Now.AddHours(-24))
        {
            var parameters = new Dictionary<string, string> { { "token", accessToken } };
            var httpClient = new HttpClient();

            const string clientId = "polaris";
            const string clientSecret = "foobar";

            var authHeader = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeader);

            var authServer = _configuration.GetSection("AuthServer").Value;
            if (authServer == null || string.IsNullOrEmpty(authServer))
                return AuthenticateResult.Fail("AuthServer is not configured");

            var response = await httpClient.PostAsync($"{authServer}/oauth2/introspect",
                new FormUrlEncodedContent(parameters));

            var responseValue = await response.Content.ReadAsStringAsync();
            var tokenModel = JsonConvert.DeserializeObject<OAuth2IntrospectResult>(responseValue);
            if (tokenModel == null || !tokenModel.Active ||
                tokenModel.ClientId != clientId)
                return AuthenticateResult.Fail("token not active or client_id not match");

            var dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            var expireTime = dtDateTime.AddSeconds(tokenModel.Exp).ToLocalTime();
            if (expireTime < DateTime.Now)
                return AuthenticateResult.Fail("Access token expired");

            // 将introspect结果保存到数据库
            accountModel = SaveAccount(accessToken, new DateTimeOffset(expireTime), tokenModel);
        }

        var username = accountModel.Username;
        var client = new OAuth2AuthenticationClient()
        {
            AuthenticationType = OAuth2AuthenticationDefaults.AuthenticationScheme,
            IsAuthenticated = true,
            Name = username
        };
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, username)
        };
        var claimsPrincipal = new ClaimsPrincipal(new ClaimsIdentity(client, claims));

        return AuthenticateResult.Success(new AuthenticationTicket(claimsPrincipal, Scheme.Name));
    }

    private AccountModel SaveAccount(string accessToken, DateTimeOffset tokenExpire, OAuth2IntrospectResult tokenModel)
    {
        var account = _databaseContext.Accounts.FirstOrDefault(o => o.Username == tokenModel.Username);
        if (account == null)
        {
            account = new AccountModel()
            {
                AccessToken = accessToken,
                CreateTime = DateTimeOffset.Now,
                UpdateTime = DateTimeOffset.Now,
                Username = tokenModel.Username,
                Description = "",
                Mail = "",
                Nickname = tokenModel.Username,
                Status = 0,
                TokenExpire = tokenExpire,
                TokenIssuer = tokenModel.Iss ?? "",
            };
            _databaseContext.Add(account);
            _databaseContext.SaveChanges();
        }
        else
        {
            account.AccessToken = accessToken;
            account.TokenExpire = tokenExpire;
            account.TokenIssuer = tokenModel.Iss ?? "";
            account.UpdateTime = DateTimeOffset.Now;
            _databaseContext.Update(account);
            _databaseContext.SaveChanges();
        }

        return account;
    }
}