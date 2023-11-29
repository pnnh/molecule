using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Polaris.Business.Models;

[Table("accounts")]
[PrimaryKey(nameof(Pk))]
public class AccountModel
{
    [Column("id", TypeName = "bigint")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; } = 0;

    [Column("pk", TypeName = "varchar(64)")]
    public string Pk { get; set; } = "";

    [Column("create_time", TypeName = "timestamptz")]
    public DateTimeOffset CreateTime { get; set; } = new(2023, 1, 1, 0, 0, 0, TimeSpan.Zero);

    [Column("update_time", TypeName = "timestamptz")]
    public DateTimeOffset UpdateTime { get; set; } = new(2023, 1, 1, 0, 0, 0, TimeSpan.Zero);

    [Column("account", TypeName = "varchar(96)")]
    public string Username { get; set; } = "";

    [Column("password", TypeName = "varchar(96)")]
    public string Password { get; set; } = "";

    [Column("image", TypeName = "varchar(256)")]
    public string Image { get; set; } = "";

    [Column("description", TypeName = "varchar(256)")]
    public string Description { get; set; } = "";

    [Column("mail", TypeName = "varchar(128)")]
    public string Mail { get; set; } = "";

    [Column("status", TypeName = "int")]
    public int Status { get; set; } = 0;

    [Column("nickname", TypeName = "varchar(64)")]
    public string Nickname { get; set; } = "";

    [Column("counter", TypeName = "int")]
    public uint Counter { get; set; } = 0;

    [Column("access_token", TypeName = "varchar(256)")]
    public string AccessToken { get; set; } = "";

    [Column("token_issuer", TypeName = "varchar(128)")]
    [JsonIgnore]
    public string TokenIssuer { get; set; } = "";

    [Column("token_expire", TypeName = "timestamptz")]
    [JsonIgnore]
    public DateTimeOffset TokenExpire { get; set; } = new(2023, 1, 1, 0, 0, 0, TimeSpan.Zero);

    [Column("sync_time", TypeName = "timestamptz")]
    [JsonIgnore]
    public DateTimeOffset SyncTime { get; set; } = new(2023, 1, 1, 0, 0, 0, TimeSpan.Zero);
}

public class AccountMakeAssertion
{
    public string Authorization { get; set; } = "";
}

public class AccountValidate
{
    public string Name { get; set; } = "";
}