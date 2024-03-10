using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Molecule.Helpers;
using Molecule.Models;

namespace Polaris.Business.Models;

[Table("channels")]
[PrimaryKey(nameof(Uid))]
public class ChannelModel
{
    [Column("uid", TypeName = "uuid")] public Guid Uid { get; set; }

    [Column("nid", TypeName = "bigint")]
    public long Nid { get; set; }

    [NotMapped] public string Urn => MIDHelper.Base58.LongEncode(Nid);

    [Column("name", TypeName = "varchar(128)")]
    public string Name { get; set; } = "";

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
}

public class ChannelPostsView
{
    public ChannelModel Channel { get; set; } = new();
    public MSelectResult<PostModel> Posts { get; set; } = new();
}