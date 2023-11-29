namespace Polaris.Business.Services.Article;

using System.Data.Entity;
using Molecule.Helpers;
using Polaris.Business.Helpers;
using Polaris.Business.Models;

public class ArticleService
{
    private readonly ServiceContext serviceContext;

    public ArticleService(ServiceContext serviceContext)
    {
        this.serviceContext = serviceContext;
    }

    public PLSelectResult<ArticleModel> Select(string queryString)
    {
        var queryHelper = new PLQueryHelper(queryString);
        var page = queryHelper.GetInt("page") ?? 1;
        var size = queryHelper.GetInt("size") ?? 10;
        var (offset, limit) = Pagination.CalcOffset(page, size);

        var totalCount = serviceContext.DataContext.Articles.Count();
        var models = serviceContext.DataContext.Articles.OrderByDescending(o => o.UpdateTime)
        .Skip(offset).Take(limit).ToList();

        return new PLSelectResult<ArticleModel>
        {
            Range = models,
            Count = totalCount
        };
    }
}
