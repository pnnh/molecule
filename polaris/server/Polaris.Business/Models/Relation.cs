namespace Polaris.Business.Models;

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Text.Json;
using System.Text.Json.Serialization;

[Table("relations")]
[PrimaryKey(nameof(Pk))]
public class RelationModel
{

    [Column("pk", TypeName = "varchar(64)")]
    [JsonPropertyName("pk")]
    public string Pk { get; set; } = "";

    [Column("source", TypeName = "varchar(64)")]
    [JsonPropertyName("source")]
    public string Source { get; set; } = "";

    [Column("create_time", TypeName = "timestamptz")]
    [JsonPropertyName("create_time")]
    public DateTime CreateTime { get; set; } = DateTime.MinValue;

    [Column("update_time", TypeName = "timestamptz")]
    [JsonPropertyName("update_time")]
    public DateTime UpdateTime { get; set; } = DateTime.MinValue;

    [Column("creator", TypeName = "varchar(64)")]
    [JsonPropertyName("creator")]
    public string Creator { get; set; } = "";

    [Column("target", TypeName = "varchar(64)")]
    [JsonPropertyName("target")]
    public string Target { get; set; } = "";

    [Column("direction", TypeName = "varchar(16)")]
    [JsonPropertyName("direction")]
    public string Direction { get; set; } = "";

    [Column("discover", TypeName = "bigint")]
    [JsonPropertyName("discover")]
    public long Discover { get; set; } = 0;

    [Column("status", TypeName = "int")]
    [JsonPropertyName("status")]
    public int Status { get; set; } = 0;

    public static void MapperConfig(IMapperConfigurationExpression cfg)
    {
        cfg.CreateMap<IDataReader, RelationModel>()
            .ForMember(a => a.CreateTime, opt => opt.MapFrom(src => src["create_time"]))
            .ForMember(a => a.UpdateTime, opt => opt.MapFrom(src => src["update_time"]));
    }
}

public class CustomResolver<S, T, M> : IValueResolver<IDataReader, RelationFullModel<S, T>, M?>// where S : BaseModel where T : BaseModel
{
    private string _columnName = "";
    public CustomResolver(string columnName)
    {
        _columnName = columnName;
    }
    public M? Resolve(IDataReader source, RelationFullModel<S, T> destination, M? member, ResolutionContext context)
    {
        var value = source[_columnName];
        var stringValue = value?.ToString();
        if (string.IsNullOrEmpty(stringValue) || string.IsNullOrWhiteSpace(stringValue))
            return default(M);
        return JsonSerializer.Deserialize<M>(stringValue);
    }
}

// public interface IRelationFullModel<out S, out T> where S : BaseModel where T : BaseModel
// {

// }

public class RelationFullModel<S, T> : RelationModel//, IRelationFullModel<S, T> where S : BaseModel where T : BaseModel
{
    [Column("source_model")]
    [JsonPropertyName("source_model")]
    public S? SourceModel { get; set; }

    [Column("target_model")]
    [JsonPropertyName("target_model")]
    public T? TargetModel { get; set; }

    public static new void MapperConfig(IMapperConfigurationExpression cfg)
    {
        cfg.CreateMap<IDataReader, RelationFullModel<S, T>>()
            .ForMember(a => a.CreateTime, opt => opt.MapFrom(src => src["create_time"]))
            .ForMember(a => a.UpdateTime, opt => opt.MapFrom(src => src["update_time"]))
            .ForMember(a => a.SourceModel, opt => opt.MapFrom(new CustomResolver<S, T, S>("source_model")))
            .ForMember(a => a.TargetModel, opt => opt.MapFrom(new CustomResolver<S, T, T>("target_model")));
    }
}