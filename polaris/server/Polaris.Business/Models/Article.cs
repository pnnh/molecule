

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;
using AutoMapper;
using System.Data;

namespace Polaris.Business.Models
{

    [Table("articles")]
    [PrimaryKey(nameof(Pk))]
    public class ArticleModel// : BaseModel
    {
        [Column("pk", TypeName = "varchar(64)")]
        [JsonPropertyName("pk")]
        public string Pk { get; set; } = "";

        [Column("title", TypeName = "varchar(128)")]
        [JsonPropertyName("title")]
        public string Title { get; set; } = "";

        [Column("header", TypeName = "varchar(64)")]
        [JsonPropertyName("header")]
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

        [Column("creator", TypeName = "varchar(64)")]
        [JsonPropertyName("creator")]
        public string Creator { get; set; } = "";

        [Column("keywords", TypeName = "varchar(128)")]
        [JsonPropertyName("keywords")]
        public string Keywords { get; set; } = "";

        [Column("description", TypeName = "varchar(512)")]
        [JsonPropertyName("description")]
        public string Description { get; set; } = "";

        [Column("status", TypeName = "int")]
        [JsonPropertyName("status")]
        public int Status { get; set; } = 0;

        [Column("cover", TypeName = "varchar(256)")]
        [JsonPropertyName("cover")]
        public string Cover { get; set; } = "";

        [NotMapped]
        [JsonPropertyName("relation")]
        public string Relation { get; set; } = "";

        [NotMapped]
        [JsonPropertyName("discover")]
        public int Discover { get; set; } = 0;

        [NotMapped]
        [JsonPropertyName("channel")]
        public string Channel { get; set; } = "";

        [Column("name", TypeName = "varchar(64)")]
        [JsonPropertyName("name")]
        public string Name { get; set; } = "";

        [Column("profile", TypeName = "varchar(96)")]
        [JsonPropertyName("profile")]
        public string Profile { get; set; } = "";

        [Column("profile_name", TypeName = "varchar(96)")]
        [JsonPropertyName("profile_name")]
        public string ProfileName { get; set; } = "";

        public static void MapperConfig(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<IDataReader, ArticleModel>()
                .ForMember(a => a.CreateTime, opt => opt.MapFrom(src => src["create_time"]))
                .ForMember(a => a.UpdateTime, opt => opt.MapFrom(src => src["update_time"]));
        }
    }
}
