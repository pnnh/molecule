

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Polaris.Business.Models
{

    [Table("viewers")]
    [PrimaryKey(nameof(Pk))]
    public class ViewerModel
    {
        [Column("pk", TypeName = "varchar(64)")]
        public string Pk { get; set; } = "";

        [Column("source", TypeName = "varchar(64)")]
        public string Source { get; set; } = "";

        [Column("creator", TypeName = "varchar(64)")]
        public string Creator { get; set; } = "";

        [Column("target", TypeName = "varchar(64)")]
        public string Target { get; set; } = "";

        [Column("channel", TypeName = "varchar(64)")]
        public string Channel { get; set; } = "";

        [Column("direction", TypeName = "varchar(16)")]
        public string Direction { get; set; } = "";

        [Column("create_time", TypeName = "timestamptz")]
        [JsonPropertyName("create_time")]
        public DateTimeOffset CreateTime { get; set; } = new(2023, 1, 1, 0, 0, 0, TimeSpan.Zero);

        [Column("update_time", TypeName = "timestamptz")]
        [JsonPropertyName("update_time")]
        public DateTimeOffset UpdateTime { get; set; } = new(2023, 1, 1, 0, 0, 0, TimeSpan.Zero);
    }
}
