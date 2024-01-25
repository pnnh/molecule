using Microsoft.AspNetCore.Http;

namespace Molecule.Helpers;

public class QueryHelper
{
    private readonly IQueryCollection _query;

    public QueryHelper(IQueryCollection query)
    {
        _query = query;
    }

    public int? GetInt(string name)
    {
        if (_query.TryGetValue(name, out var value))
            if (int.TryParse(value, out var intValue))
                return intValue;

        return null;
    }

    public long? GetLong(string name)
    {
        if (_query.TryGetValue(name, out var value))
            if (long.TryParse(value, out var intValue))
                return intValue;

        return null;
    }

    public string? GetString(string name)
    {
        if (_query.TryGetValue(name, out var value)) return value;

        return null;
    }
}