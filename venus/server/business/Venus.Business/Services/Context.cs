using Venus.Business.Models;

namespace Venus.Business.Services;

public class ServiceContext
{
    public DatabaseContext DataContext { get; set; }
    public ServiceContext(DatabaseContext dataContext)
    {
        this.DataContext = dataContext;

    }
}