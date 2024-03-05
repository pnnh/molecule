using AutoMapper;
using AutoMapper.Data;
using Polaris.Business.Models;
using Polaris.Business.Models.Personal;

namespace Polaris.Business.Helpers;

public class MapperHelper
{
    public static IMapper GetMapper()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.AddDataReaderMapping();
            cfg.AddDataRecordMember();
            cfg.SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
            cfg.DestinationMemberNamingConvention = new PascalCaseNamingConvention();

            PostModel.MapperConfig(cfg);
            // ChannelModel.MapperConfig(cfg);
            RelationModel.MapperConfig(cfg);
            HistoryModel.MapperConfig(cfg);
            RelationFullModel<ChannelModel, HistoryModel>.MapperConfig(cfg);
            RelationFullModel<ChannelModel, PostModel>.MapperConfig(cfg);
            PartitionQueryModel.MapperConfig(cfg);
            NoteModel.MapperConfig(cfg);
            DirectoryModel.MapperConfig(cfg);
            NotebookModel.MapperConfig(cfg);
        });
#if DEBUG
        configuration.AssertConfigurationIsValid();
#endif
        var mapper = configuration.CreateMapper();

        return mapper;
    }
}