using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq.Expressions;
using System.Reflection;
using System.Reflection.Emit;
using AutoMapper;
using AutoMapper.Configuration.Conventions;
using AutoMapper.Data;
using AutoMapper.Data.Configuration.Conventions;
using AutoMapper.Data.Mappers;
using AutoMapper.Data.Utils;
using AutoMapper.Internal;
using AutoMapper.Internal.Mappers;
using AutoMapper.Utils;
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

            cfg.AddProfile<AutoMapperProfile2>();
        });
#if DEBUG
        configuration.AssertConfigurationIsValid();
#endif
        configuration.CompileMappings();
        var mapper = configuration.CreateMapper();

        return mapper;
    }
    
}

