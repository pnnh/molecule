using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Reflection;
using AutoMapper;
using Polaris.Business.Models;
using Polaris.Business.Models.Personal;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<IDataReader, ChannelModel>().ForAllMembers(m=>
            m.MapFrom(src => Map(src, m.DestinationMember)));
        CreateMap<IDataReader, PostModel>().ForAllMembers(m=> 
            m.MapFrom(src=>Map(src, m.DestinationMember)));
        CreateMap<IDataReader, RelationModel>().ForAllMembers(m=> 
            m.MapFrom(src=>Map(src, m.DestinationMember)));
        CreateMap<IDataReader, HistoryModel>().ForAllMembers(m => 
            m.MapFrom(src => Map(src, m.DestinationMember)));
        // CreateMap<IDataReader, RelationFullModel<ChannelModel, HistoryModel>>().ForAllMembers(m => 
        //     m.MapFrom(src => Map(src, m.DestinationMember)));
        // CreateMap<IDataReader, RelationFullModel<ChannelModel, PostModel>>().ForAllMembers(m => 
        //     m.MapFrom(src => Map(src, m.DestinationMember)));
        CreateMap<IDataReader, PartitionQueryModel>().ForAllMembers(m => 
            m.MapFrom(src => Map(src, m.DestinationMember)));
        // CreateMap<IDataReader, DirectoryModel>().ForAllMembers(m => 
        //     m.MapFrom(src => Map(src, m.DestinationMember)));
        CreateMap<IDataReader, NoteModel>().ForAllMembers(m => 
            m.MapFrom(src => Map(src, m.DestinationMember)));
        CreateMap<IDataReader, NotebookModel>().ForAllMembers(m => 
           m.MapFrom(src => Map(src, m.DestinationMember)));
    }
    
    private object Map(IDataReader dataReader, MemberInfo memberInfo)
    {
        var v = new PascalCaseNamingConvention();
        var colAttr = memberInfo.GetCustomAttributes().FirstOrDefault(t => t.GetType() == typeof(ColumnAttribute));
        
        if (memberInfo is not PropertyInfo)
        {
            return new object();
        }
        var propInfo = (PropertyInfo) memberInfo;
        
        if (!IsSimple(propInfo.PropertyType)) 
        {
            return new object();
        } 
        
        var destName = colAttr == null ? memberInfo.Name : ((ColumnAttribute)colAttr).Name;
        var arr = v.Split(destName);
        var colName = "";
        colName = arr.Length < 1 ? destName!.ToLower() : string.Join( "_", arr.Select(a => a.ToLower()));
        return dataReader[colName];
    }
    
    bool IsSimple(Type type)
    {
        var typeInfo = type.GetTypeInfo();
        if (typeInfo.IsGenericType && typeInfo.GetGenericTypeDefinition() == typeof(Nullable<>))
        {
            return IsSimple(typeInfo.GetGenericArguments()[0]);
        }
        return typeInfo.IsPrimitive 
               || typeInfo.IsEnum
               || typeInfo.Equals(typeof(Guid))
               || type.Equals(typeof(string))
               || type.Equals(typeof(DateTime))
               || type.Equals(typeof(DateTimeOffset))
               || type.Equals(typeof(decimal));
    }
}