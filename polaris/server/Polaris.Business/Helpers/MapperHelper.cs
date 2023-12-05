using AutoMapper;
using AutoMapper.Data;
using Polaris.Business.Models;

namespace Polaris.Business.Helpers;

public class MapperHelper
{
    public static IMapper GetMapper()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.AddDataReaderMapping();
            cfg.AddDataRecordMember();
            PageModel.MapperConfig(cfg);
            ChannelModel.MapperConfig(cfg);
            RelationModel.MapperConfig(cfg);
            HistoryModel.MapperConfig(cfg);
            RelationFullModel<ChannelModel, HistoryModel>.MapperConfig(cfg);
            RelationFullModel<ChannelModel, PageModel>.MapperConfig(cfg);
        });
#if DEBUG
        configuration.AssertConfigurationIsValid();
#endif
        var mapper = configuration.CreateMapper();

        return mapper;
    }
}