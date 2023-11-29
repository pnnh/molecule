using AutoMapper;
using AutoMapper.Data;
using Polaris.Business.Models;

namespace Polaris.Utils;

public class MapperHelper
{
    public static IMapper GetMapper()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.AddDataReaderMapping();
            cfg.AddDataRecordMember();
            ArticleModel.MapperConfig(cfg);
            ChannelModel.MapperConfig(cfg);
            RelationModel.MapperConfig(cfg);
            HistoryModel.MapperConfig(cfg);
            RelationFullModel<ChannelModel, HistoryModel>.MapperConfig(cfg);
        });
#if DEBUG
        configuration.AssertConfigurationIsValid();
#endif
        var mapper = configuration.CreateMapper();

        return mapper;
    }
}