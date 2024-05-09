
using System.Text.Json.Serialization;
using Polaris.Business.Models.Polaris;

namespace Polaris.Business.Models
{
    public class SessionModel {
        [JsonPropertyName("account")]
        public PSAccountModel Account { get; set; } = new();
        
        [JsonPropertyName("token")]
        public string Token { get; set; } = "";
    }
}
