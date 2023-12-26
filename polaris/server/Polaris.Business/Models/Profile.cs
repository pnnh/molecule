using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Polaris.Business.Models;

[Table("profiles")]
[PrimaryKey(nameof(Pk))]
public class ProfileModel
{
    [Column("pk", TypeName = "varchar(64)")]
    [JsonPropertyName("pk")]
    public string Pk { get; set; } = "";

    [Column("create_time", TypeName = "timestamptz")]
    [JsonPropertyName("create_time")]
    public DateTimeOffset CreateTime { get; set; } = new(2023, 1, 1, 0, 0, 0, TimeSpan.Zero);

    [Column("update_time", TypeName = "timestamptz")]
    [JsonPropertyName("update_time")]
    public DateTimeOffset UpdateTime { get; set; } = new(2023, 1, 1, 0, 0, 0, TimeSpan.Zero);

    [Column("username", TypeName = "varchar(96)")]
    [JsonPropertyName("username")]
    public string Username { get; set; } = "";

    [Column("owner", TypeName = "varchar(96)")]
    [JsonPropertyName("owner")]
    public string Owner { get; set; } = "";

    [Column("role", TypeName = "varchar(96)")]
    [JsonPropertyName("role")]
    public string Role { get; set; } = "";

    [Column("description", TypeName = "varchar(256)")]
    [JsonPropertyName("description")]
    public string? Description { get; set; } = "";

    [Column("nickname", TypeName = "varchar(64)")]
    [JsonPropertyName("nickname")]
    public string Nickname { get; set; } = "";
}