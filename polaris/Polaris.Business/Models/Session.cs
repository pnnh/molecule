
 
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Polaris.Business.Models
{
    public class SessionModel {
        [JsonPropertyName("account")]
        public AccountModel Account { get; set; } = new();
        
        [JsonPropertyName("token")]
        public string Token { get; set; } = "";
    }
}
