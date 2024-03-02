namespace Venus.Business.Helpers;

using System.Collections.Specialized;
using System.Web;
using Microsoft.AspNetCore.Http;

public class PLQueryHelper
{
    private readonly Dictionary<string, string> _query = new Dictionary<string, string>();

    public PLQueryHelper(string queryString)
    {
        var collection = HttpUtility.ParseQueryString(queryString);
        foreach (var key in collection.AllKeys)
        {
            var value = collection[key];
            if (key == null || value == null) continue;

            _query.Add(key, value);
        }
    }

    public PLQueryHelper(NameValueCollection query)
    {
        _query = query.AllKeys.ToDictionary(k => k!, k => query[k] ?? "");
    }

    public PLQueryHelper(IQueryCollection query)
    {
        _query = query.ToDictionary(k => k.Key,
            k => k.Value.ToString());
    }


    public int? GetInt(string name)
    {
        if (_query.TryGetValue(name, out var value) && int.TryParse(value, out var result))
        {
            return result;
        }

        return null;
    }

    public long? GetLong(string name)
    {
        if (_query.TryGetValue(name, out var value) && long.TryParse(value, out var result))
        {
            return result;
        }

        return null;
    }

    public string? GetString(string name)
    {
        if (_query.TryGetValue(name, out var value))
        {
            return value;
        }

        return null;
    }

    public string[]? GetStringArray(string name)
    {
        if (_query.TryGetValue(name, out var value))
        {
            return value.Split(',');
        }
        if (_query.TryGetValue(name + "[]", out var value2))
        {
            return value2.Split(',');
        }

        return null;
    }

    public DateTimeOffset? GetDateTimeOffset(string name)
    {
        if (_query.TryGetValue(name, out var value))
            if (DateTimeOffset.TryParse(value, out var dateTimeOffsetValue))
                return dateTimeOffsetValue;

        return null;
    }
}