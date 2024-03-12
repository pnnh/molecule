using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.Common;
using AutoMapper;
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
                if (parameter.Value is DateTime dt)
                    dbParameter.Value = dt.ToUniversalTime();
                command.Parameters.Add(dbParameter);
            }

        databaseContext.Database.OpenConnection();

        using var reader = command.ExecuteReader();
        var mapper = MapperHelper.GetMapper();

        return mapper.Map<IDataReader, List<T>>(new VKDataReader(reader));
    }

    public class VKDataReader(IDataReader dataReader) : IDataReader
    {
        public bool GetBoolean(int i)
        {
            return dataReader.GetBoolean(i);
        }

        public byte GetByte(int i)
        {
            return dataReader.GetByte(i);
        }

        public long GetBytes(int i, long fieldOffset, byte[]? buffer, int bufferoffset, int length)
        {
            return dataReader.GetBytes(i, fieldOffset, buffer, bufferoffset, length);
        }

        public char GetChar(int i)
        {
            return dataReader.GetChar(i);
        }

        public long GetChars(int i, long fieldoffset, char[]? buffer, int bufferoffset, int length)
        {
            return dataReader.GetChars(i, fieldoffset, buffer, bufferoffset, length);
        }

        public IDataReader GetData(int i)
        {
            return dataReader.GetData(i);
        }

        public string GetDataTypeName(int i)
        {
            return dataReader.GetDataTypeName(i);
        }

        public DateTime GetDateTime(int i)
        {
            var srcDt = dataReader.GetDateTime(i);
            return new DateTime(srcDt.Ticks, DateTimeKind.Utc);
        }

        public decimal GetDecimal(int i)
        {
            return dataReader.GetDecimal(i);
        }

        public double GetDouble(int i)
        {
            return dataReader.GetDouble(i);
        }

        public Type GetFieldType(int i)
        {
            return dataReader.GetFieldType(i);
        }

        public float GetFloat(int i)
        {
            return dataReader.GetFloat(i);
        }

        public Guid GetGuid(int i)
        {
            return dataReader.GetGuid(i);
        }

        public short GetInt16(int i)
        {
            return dataReader.GetInt16(i);
        }

        public int GetInt32(int i)
        {
            return dataReader.GetInt32(i);
        }

        public long GetInt64(int i)
        {
            return dataReader.GetInt64(i);
        }

        public string GetName(int i)
        {
            return dataReader.GetName(i);
        }

        public int GetOrdinal(string name)
        {
            var v = new PascalCaseNamingConvention();
            var destName = name;
            var arr = v.Split(destName);
            var colName = "";
            colName = arr.Length < 1 ? destName!.ToLower() : string.Join( "_", arr.Select(a => a.ToLower()));
            
            return dataReader.GetOrdinal(colName);
        }

        public string GetString(int i)
        {
            return dataReader.GetString(i);
        }

        public object GetValue(int i)
        {
            return dataReader.GetValue(i);
        }

        public int GetValues(object[] values)
        {
            return dataReader.GetValues(values);
        }

        public bool IsDBNull(int i)
        {
            return dataReader.IsDBNull(i);
        }

        public int FieldCount => dataReader.FieldCount;

        public object this[int i] => dataReader[i];

        public object this[string name] => GetByName(name);

        private object GetByName(string name)
        {
            var srcVal = dataReader[GetOrdinal(name)];
            if (srcVal is DateTime dt)
                return new DateTime(dt.Ticks, DateTimeKind.Utc);
            return srcVal;
        }

        public void Dispose()
        {
            dataReader.Dispose();
        }

        public void Close()
        {
            dataReader.Close();
        }

        public DataTable? GetSchemaTable()
        {
            return dataReader.GetSchemaTable();
        }

        public bool NextResult()
        {
            return dataReader.NextResult();
        }

        public bool Read()
        {
            return dataReader.Read();
        }

        public int Depth => dataReader.Depth;
        public bool IsClosed => dataReader.IsClosed;
        public int RecordsAffected => dataReader.RecordsAffected;
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
                if (parameter.Value is DateTime dt)
                    dbParameter.Value = dt.ToUniversalTime();
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
                if (parameter.Value is DateTime dt)
                    dbParameter.Value = dt.ToUniversalTime();
                command.Parameters.Add(dbParameter);
            }

        databaseContext.Database.OpenConnection();
        var value = command.ExecuteScalar();

        var mapper = MapperHelper.GetMapper();

        return value == null ? default : mapper.Map<object, T>(value);
    }
}