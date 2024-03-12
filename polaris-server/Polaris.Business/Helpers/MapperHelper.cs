using AutoMapper;
using AutoMapper.Data;
using AutoMapper.Internal;
using Polaris.Business.Models;
using Polaris.Business.Models.Personal;

namespace Polaris.Business.Helpers;

public class MapperHelper
{
    public static IMapper GetMapper()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
            cfg.DestinationMemberNamingConvention = new PascalCaseNamingConvention();

            cfg.AddDataReaderMapping();
            cfg.AddDataRecordMember();
            cfg.CreateMap<DateTime, DateTime>().ConvertUsing<DateTimeTypeConverter>();

            cfg.CreateMap<DateTimeOffset, DateTimeOffset>().ConvertUsing<DateTimeOffsetTypeConverter>();

            cfg.CreateMap<DateTime, DateTimeOffset>().ConvertUsing<DateTimeOffset2TypeConverter>();

            PostModel.MapperConfig(cfg);
            RelationModel.MapperConfig(cfg);
            HistoryModel.MapperConfig(cfg);
            RelationFullModel<ChannelModel, HistoryModel>.MapperConfig(cfg);
            RelationFullModel<ChannelModel, PostModel>.MapperConfig(cfg);
            PartitionQueryModel.MapperConfig(cfg);
            NoteModel.MapperConfig(cfg);
            DirectoryModel.MapperConfig(cfg);
            NotebookModel.MapperConfig(cfg);
            cfg.AddProfile<AutoMapperProfile>();
            
            
        });
#if DEBUG
        configuration.AssertConfigurationIsValid();
#endif
        configuration.CompileMappings();
        var mapper = configuration.CreateMapper();

        return mapper;
    }
}
internal class DateTimeTypeConverter : ITypeConverter<DateTime, DateTime>
{
    public DateTime Convert(DateTime source, DateTime destination, ResolutionContext context)
    {
        var newValue = new DateTime(source.Ticks, DateTimeKind.Utc);
        return newValue;
    }
}

internal class DateTimeOffsetTypeConverter : ITypeConverter<DateTimeOffset, DateTimeOffset>
{
    public DateTimeOffset Convert(DateTimeOffset source, DateTimeOffset destination, ResolutionContext context)
    {
        var newValue = new DateTimeOffset(source.Ticks, TimeSpan.Zero);
        return newValue;
    }
}
internal class DateTimeOffset2TypeConverter : ITypeConverter<DateTime, DateTimeOffset>
{
    public DateTimeOffset Convert(DateTime source, DateTimeOffset destination, ResolutionContext context)
    {
        var newValue = new DateTimeOffset(source.Ticks, TimeSpan.Zero);
        return newValue;
    }
}