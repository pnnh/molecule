namespace Polaris.Business.Models;

using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Data;
using AutoMapper;

[Table("channels")]
[PrimaryKey(nameof(Pk))]
public class ChannelModel// : BaseModel
{
    [Column("pk", TypeName = "varchar(64)")]
    [JsonPropertyName("pk")]
    public string Pk { get; set; } = "";

    [Column("name", TypeName = "varchar(64)")]
    [JsonPropertyName("name")]
    public string Name { get; set; } = "";

    [Column("title", TypeName = "varchar(128)")]
    [JsonPropertyName("title")]
    public string Title { get; set; } = "";

    [Column("create_time", TypeName = "timestamptz")]
    [JsonPropertyName("create_time")]
    public DateTime CreateTime { get; set; } = DateTime.MinValue;

    [Column("update_time", TypeName = "timestamptz")]
    [JsonPropertyName("update_time")]
    public DateTime UpdateTime { get; set; } = DateTime.MinValue;

    [Column("creator", TypeName = "varchar(64)")]
    [JsonPropertyName("creator")]
    public string Creator { get; set; } = "";

    [Column("description", TypeName = "varchar(256)")]
    [JsonPropertyName("description")]
    public string Description { get; set; } = "";

    [Column("image", TypeName = "varchar(2048)")]
    [JsonPropertyName("image")]
    public string Image { get; set; } = "";

    [Column("profile", TypeName = "varchar(96)")]
    [JsonPropertyName("profile")]
    public string Profile { get; set; } = "";

    [NotMapped]
    [JsonPropertyName("profile_name")]
    public string ProfileName { get; set; } = "";

    public static void MapperConfig(IMapperConfigurationExpression cfg)
    {
        cfg.CreateMap<IDataReader, ChannelModel>()
            .ForMember(a => a.CreateTime, opt => opt.MapFrom(src => src["create_time"]))
            .ForMember(a => a.UpdateTime, opt => opt.MapFrom(src => src["update_time"]))
            .ForMember(a => a.ProfileName, opt => opt.MapFrom(src => src["profile_name"]));
    }
}