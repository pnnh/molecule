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