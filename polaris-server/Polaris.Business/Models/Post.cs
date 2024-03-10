using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Text.Json.Serialization;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Molecule.Helpers;

namespace Polaris.Business.Models;

[Table("posts")]
[PrimaryKey(nameof(Uid))]
public class PostModel
{
    [Column("uid", TypeName = "uuid")]
    [JsonPropertyName("uid")]
    public Guid Uid { get; set; }

    [Column("nid", TypeName = "bigint")]
    public long Nid { get; set; }

    [NotMapped] public string Urn => MIDHelper.Base58.LongEncode(Nid);

    [Column("title", TypeName = "varchar(128)")]
    [JsonPropertyName("title")]
    public string Title { get; set; } = "";

    [Column("header", TypeName = "varchar(64)")]
    public string Header { get; set; } = "";

    [Column("body", TypeName = "text")]
    [JsonPropertyName("body")]
    public string Body { get; set; } = "";

    [Column("create_time", TypeName = "timestamptz")]
    [JsonPropertyName("create_time")]
    public DateTimeOffset CreateTime { get; set; } = new(2023, 1, 1, 0, 0, 0, TimeSpan.Zero);

    [Column("update_time", TypeName = "timestamptz")]
    [JsonPropertyName("update_time")]
    public DateTimeOffset UpdateTime { get; set; } = new(2023, 1, 1, 0, 0, 0, TimeSpan.Zero);

    [Column("owner", TypeName = "uuid")]
    public Guid Owner { get; set; }

    [Column("keywords", TypeName = "varchar(128)")]
    [JsonPropertyName("keywords")]
    public string Keywords { get; set; } = "";

    [Column("description", TypeName = "varchar(512)")]
    [JsonPropertyName("description")]
    public string Description { get; set; } = "";

    [Column("status", TypeName = "int")]
    public int Status { get; set; }

    [Column("cover", TypeName = "varchar(256)")]
    [JsonPropertyName("cover")]
    public string Cover { get; set; } = "";

    [Column("discover", TypeName = "integer")]
    [JsonPropertyName("discover")]
    public int Discover { get; set; }

    [Column("channel", TypeName = "uuid")]
    [JsonPropertyName("channel")]
    public Guid Channel { get; set; }

    [NotMapped]
    [JsonPropertyName("channel_name")]
    public string? ChannelName { get; set; } = "";


    [NotMapped]
    [JsonPropertyName("owner_name")]
    public string? OwnerName { get; set; } = "";

    [Column("partition", TypeName = "uuid")]
    [JsonPropertyName("partition")]
    public Guid Partition { get; set; }

    public static void MapperConfig(IMapperConfigurationExpression cfg)
    {
        cfg.CreateMap<IDataReader, PostModel>()
            .ForMember(a => a.CreateTime, opt => opt.MapFrom(src => src["create_time"]))
            .ForMember(a => a.UpdateTime, opt => opt.MapFrom(src => src["update_time"]));
        //.ForMember(a => a.ChannelName, opt => opt.MapFrom(src => src["channel_name"]))
        //.ForMember(a => a.OwnerName, opt => opt.MapFrom(src => src["profile_name"]));
    }
}