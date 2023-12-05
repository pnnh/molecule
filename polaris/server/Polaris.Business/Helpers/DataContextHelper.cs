using System.Data; 
using Microsoft.EntityFrameworkCore;
using Polaris.Business.Models;

namespace Polaris.Business.Helpers;


public static class DatabaseContextHelper
{
    public static List<T> RawSqlQuery<T>(DatabaseContext databaseContext, string query,
        Dictionary<string, object>? parameters)
    {
        using var command = databaseContext.Database.GetDbConnection().CreateCommand();
        command.CommandText = query;
        command.CommandType = CommandType.Text;
        if (parameters != null)
            foreach (var parameter in parameters)
            {
                var dbParameter = command.CreateParameter();
                dbParameter.ParameterName = parameter.Key;
                dbParameter.Value = parameter.Value;
                command.Parameters.Add(dbParameter);
            }

        databaseContext.Database.OpenConnection();

        using var reader = command.ExecuteReader();
        var mapper = MapperHelper.GetMapper();

        return mapper.Map<IDataReader, List<T>>(reader);
    }

    public static IDataReader RawSqlQueryReader(DatabaseContext databaseContext, string query,
        Dictionary<string, object>? parameters)
    {
        using var command = databaseContext.Database.GetDbConnection().CreateCommand();
        command.CommandText = query;
        command.CommandType = CommandType.Text;
        if (parameters != null)
            foreach (var parameter in parameters)
            {
                var dbParameter = command.CreateParameter();
                dbParameter.ParameterName = parameter.Key;
                dbParameter.Value = parameter.Value;
                command.Parameters.Add(dbParameter);
            }

        databaseContext.Database.OpenConnection();

        // 需要手动关闭DataReader
        return command.ExecuteReader();
    }

    public static T? RawSqlScalar<T>(DatabaseContext databaseContext, string query,
        Dictionary<string, object>? parameters)
    {
        using var command = databaseContext.Database.GetDbConnection().CreateCommand();
        command.CommandText = query;
        command.CommandType = CommandType.Text;
        if (parameters != null)
            foreach (var parameter in parameters)
            {
                var dbParameter = command.CreateParameter();
                dbParameter.ParameterName = parameter.Key;
                dbParameter.Value = parameter.Value;
                command.Parameters.Add(dbParameter);
            }

        databaseContext.Database.OpenConnection();
        var value = command.ExecuteScalar();

        var mapper = MapperHelper.GetMapper();

        return value == null ? default : mapper.Map<object, T>(value);
    }
}