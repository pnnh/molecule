using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Molecule.Helpers;

namespace Polaris.Business.Models;

[Table("channels")]
[PrimaryKey(nameof(Uid))]
public class ChannelModel
{
    [Column("uid", TypeName = "uuid")] public Guid Uid { get; set; }

    [NotMapped] public string Urn => MIDHelper.Default.GuidBase32(Uid);

    [Column("title", TypeName = "varchar(128)")]
    public string Title { get; set; } = "";

    [Column("create_time", TypeName = "timestamptz")]
    [JsonPropertyName("create_time")]
    public DateTime CreateTime { get; set; } = DateTime.MinValue;

    [Column("update_time", TypeName = "timestamptz")]
    [JsonPropertyName("update_time")]
    public DateTime UpdateTime { get; set; } = DateTime.MinValue;

    [Column("owner", TypeName = "uuid")] public Guid Owner { get; set; }

    [Column("description", TypeName = "varchar(256)")]
    public string Description { get; set; } = "";

    [Column("image", TypeName = "varchar(2048)")]
    public string Image { get; set; } = "";

    // public static void MapperConfig(IMapperConfigurationExpression cfg)
    // {
    //     cfg.CreateMap<IDataReader, ChannelModel>()
    //         .ForMember(a => a.CreateTime, opt => opt.MapFrom(src => src["create_time"]))
    //         .ForMember(a => a.UpdateTime, opt => opt.MapFrom(src => src["update_time"]))
    //         ;
    // }
}