namespace Polaris.Business.Services.Article;

using System.Data.Entity;
using System.Text;
using Polaris.Business.Helpers;
using Polaris.Business.Models;

public class PageService
{
    private readonly ServiceContext serviceContext;

    public PageService(ServiceContext serviceContext)
    {
        this.serviceContext = serviceContext;
    }

    public PLSelectResult<PageModel> Select(string queryString)
    {
        var queryHelper = new PLQueryHelper(queryString);
        var page = queryHelper.GetInt("page") ?? 1;
        var size = queryHelper.GetInt("size") ?? 10;
        var (offset, limit) = Pagination.CalcOffset(page, size);

        var totalCount = serviceContext.DataContext.Pages.Count();
        var models = serviceContext.DataContext.Pages.OrderByDescending(o => o.UpdateTime)
        .Skip(offset).Take(limit).ToList();

        return new PLSelectResult<PageModel>
        {
            Range = models,
            Count = totalCount
        };
    }

    public PageModel? GetByQuery(PLQueryHelper queryHelper)
    {
        var profile = queryHelper.GetString("profile");
        var channel = queryHelper.GetString("channel");
        var partition = queryHelper.GetString("partition");
        var pathArray = queryHelper.GetStringArray("path");

        if (string.IsNullOrEmpty(profile) || string.IsNullOrEmpty(channel)
        || string.IsNullOrEmpty(partition) || pathArray == null || pathArray.Length == 0)
        {
            return null;
        }

        var pagePath = "/" + String.Join("/", pathArray.Take(pathArray.Length - 1));
        var pageName = pathArray.Last();

        var sqlBuilder = new StringBuilder();
        var parameters = new Dictionary<string, object>();

        sqlBuilder.Append(@"
select a.*, p.username as profile_name, c.name as channel_name, t.name as partition_name
from pages as a
     join profiles as p on p.pk = a.profile
     join channels as c on c.pk = a.channel
     join partitions as t on t.pk = a.partition
where a.pk is not null and a.path = @path and a.name = @page and p.username = @profile and c.name = @channel 
    and t.name = @partition
");
        parameters.Add("@profile", profile);
        parameters.Add("@channel", channel);
        parameters.Add("@partition", partition);
        parameters.Add("@path", pagePath);
        parameters.Add("@page", pageName);

        var querySqlText = sqlBuilder.ToString();

        var modelsQuery = DatabaseContextHelper.RawSqlQuery<PageModel>(this.serviceContext.DataContext, querySqlText, parameters);

        var model = modelsQuery.FirstOrDefault();

        return model;
    }
}
