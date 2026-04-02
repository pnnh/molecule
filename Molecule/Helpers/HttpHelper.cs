using System.Net;

public static class HttpHelper
{
    private static readonly HttpClient Client;

    static HttpHelper()
    {
        Client = new HttpClient();
        Client.Timeout = TimeSpan.FromSeconds(60);
    }

    public static async Task<string> GetStringAsync(string url)
    {
        return await GetStringAsync(new Uri(url));
    }

    public static async Task<string> GetStringAsync(Uri uri)
    {
        var response = await Client.GetAsync(uri);
        return await response.Content.ReadAsStringAsync();
    }

    public static async Task<HttpResponseMessage> PutAsync(string url, HttpContent content)
    {
        return await Client.PutAsync(url, content);
    }

    public static async Task<HttpResponseMessage> PostAsync(string url, HttpContent content)
    {
        return await Client.PostAsync(url, content);
    }
}