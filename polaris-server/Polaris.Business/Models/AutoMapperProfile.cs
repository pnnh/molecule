using System.Data;
using AutoMapper;
using Polaris.Business.Models;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
        DestinationMemberNamingConvention = new PascalCaseNamingConvention();

        CreateMap<IDataReader, ChannelModel>();
    }
}