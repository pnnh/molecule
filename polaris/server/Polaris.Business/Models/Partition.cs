namespace Polaris.Business.Models;

using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

[Table("partitions")]
[PrimaryKey(nameof(Pk))]
public class PartitionModel
{
    [Column("pk", TypeName = "varchar(64)")]
    public string Pk { get; set; } = "";

    [Column("title", TypeName = "varchar(128)")]
    public string Title { get; set; } = "";

    [Column("name", TypeName = "varchar(96)")]
    [JsonPropertyName("name")]
    public string Name { get; set; } = "";

    [Column("create_time", TypeName = "timestamptz")]
    [JsonPropertyName("create_time")]
    public DateTime CreateTime { get; set; } = DateTime.MinValue;

    [Column("update_time", TypeName = "timestamptz")]
    [JsonPropertyName("update_time")]
    public DateTime UpdateTime { get; set; } = DateTime.MinValue;

    [Column("creator", TypeName = "varchar(64)")]
    public string Creator { get; set; } = "";

    [Column("description", TypeName = "varchar(256)")]
    public string Description { get; set; } = "";

    [Column("channel", TypeName = "varchar(96)")]
    [JsonPropertyName("channel")]
    public string Channel { get; set; } = "";

    [Column("parent", TypeName = "varchar(96)")]
    [JsonPropertyName("parent")]
    public string Parent { get; set; } = "";
}