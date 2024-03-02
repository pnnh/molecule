using AutoMapper;
using AutoMapper.Data;
using Venus.Business.Models;

namespace Venus.Business.Helpers;

public class MapperHelper
{
    public static IMapper GetMapper()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.AddDataReaderMapping();
            cfg.AddDataRecordMember();
        });
#if DEBUG
        configuration.AssertConfigurationIsValid();
#endif
        var mapper = configuration.CreateMapper();

        return mapper;
    }
}