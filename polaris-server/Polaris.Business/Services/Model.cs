using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Molecule.Helpers;
using Polaris.Business.Helpers;
using Polaris.Business.Models;

namespace Polaris.Business.Services;

public class ModelService(DatabaseContext databaseContext)
{

    public T? GetByKey<T>(string name, string channel = "") where T : class
    {
        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        Guid? uid = null;
        long? nid = null;
        if (Guid.TryParse(name, out var guidValue))
        {
            uid = guidValue;
        }
        else if (long.TryParse(name, out var longValue))
        {
            nid = longValue;
        }
        else if (MIDHelper.Base58.LongDecode(name) is { } long2Value)
        {
            nid = long2Value;
        }
        else
        {
            return null;
        }

        if (typeof(T).GetCustomAttributes(typeof(TableAttribute), true).FirstOrDefault()
            is not TableAttribute tableAttribute || string.IsNullOrEmpty(tableAttribute.Name))
        {
            return null;
        }

        var fullTableName = $"{tableAttribute.Name}";
        if (!string.IsNullOrEmpty(tableAttribute.Schema))
        {
            fullTableName = $"{tableAttribute.Schema}.{fullTableName}";
        }

        sqlBuilder.Append($"select a.* from {fullTableName} as a");
        sqlBuilder.Append(" where ");
        if (uid != null)
        {
            sqlBuilder.Append(" a.uid = @uid");
            parameters.Add("uid", uid);
        }
        else if (nid != null)
        {
            sqlBuilder.Append(" a.nid = @nid");
            parameters.Add("nid", nid);
        }
        else
        {
            return null;
        }
        if (!string.IsNullOrEmpty(channel))
        {
            sqlBuilder.Append(" and a.channel = @channel");
            parameters.Add("channel", Guid.Parse(channel));
        }

        var querySqlText = sqlBuilder.ToString();

        var modelsQuery = DatabaseContextHelper.RawSqlQuery<T>(databaseContext, querySqlText, parameters);

        var model = modelsQuery.FirstOrDefault();

        return model;
    }
}