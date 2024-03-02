
using Venus.Business.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;
using AutoMapper;
using System.Data;

namespace Venus.Business.Models
{

    [Table("history")]
    [PrimaryKey(nameof(Pk))]
    public class HistoryModel// : BaseModel
    {
        [Column("pk", TypeName = "varchar(64)")]
        [JsonPropertyName("pk")]
        public string Pk { get; set; } = "";

        [Column("title", TypeName = "varchar(128)")]
        [JsonPropertyName("title")]
        public string Title { get; set; } = "";

        [Column("header", TypeName = "varchar(4096)")]
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

        [Column("creator", TypeName = "varchar(96)")]
        [JsonPropertyName("creator")]
        public string Creator { get; set; } = "";

        [Column("source", TypeName = "varchar(96)")]
        [JsonPropertyName("source")]
        public string Source { get; set; } = "";

        [Column("previous", TypeName = "varchar(96)")]
        [JsonPropertyName("previous")]
        public string Previous { get; set; } = "";

        [Column("version", TypeName = "int")]
        [JsonPropertyName("version")]
        public int Version { get; set; } = 1;

        public static void MapperConfig(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<IDataReader, HistoryModel>()
                .ForMember(a => a.CreateTime, opt => opt.MapFrom(src => src["create_time"]))
                .ForMember(a => a.UpdateTime, opt => opt.MapFrom(src => src["update_time"]));
        }
    }
}
