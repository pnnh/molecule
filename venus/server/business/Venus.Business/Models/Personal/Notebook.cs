

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;
using AutoMapper;
using System.Data;

namespace Venus.Business.Models.Personal
{

    [Table("personal.notebooks")]
    [PrimaryKey(nameof(Pk))]
    public class NotebookModel
    {
        [Column("pk", TypeName = "varchar(64)")]
        [JsonPropertyName("pk")]
        public string Pk { get; set; } = "";

        [Column("title", TypeName = "varchar(128)")]
        [JsonPropertyName("title")]
        public string Title { get; set; } = "";

        [Column("create_time", TypeName = "timestamptz")]
        [JsonPropertyName("create_time")]
        public DateTimeOffset CreateTime { get; set; } = new(2023, 1, 1, 0, 0, 0, TimeSpan.Zero);

        [Column("update_time", TypeName = "timestamptz")]
        [JsonPropertyName("update_time")]
        public DateTimeOffset UpdateTime { get; set; } = new(2023, 1, 1, 0, 0, 0, TimeSpan.Zero);

        [Column("owner", TypeName = "varchar(96)")]
        [JsonPropertyName("owner")]
        public string Owner { get; set; } = "";

        [Column("description", TypeName = "varchar(512)")]
        [JsonPropertyName("description")]
        public string? Description { get; set; }

        [Column("name", TypeName = "varchar(96)")]
        [JsonPropertyName("name")]
        public string Name { get; set; } = "";

        [Column("image", TypeName = "varchar(2048)")]
        [JsonPropertyName("image")]
        public string Image { get; set; } = "";

        [Column("profile", TypeName = "varchar(96)")]
        [JsonPropertyName("profile")]
        public string Profile { get; set; } = "";

        public static void MapperConfig(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<IDataReader, NotebookModel>()
                .ForMember(a => a.CreateTime, opt => opt.MapFrom(src => src["create_time"]))
                .ForMember(a => a.UpdateTime, opt => opt.MapFrom(src => src["update_time"]));
        }
    }
}
