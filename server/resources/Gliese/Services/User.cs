using Gliese.Models;

namespace Gliese.Services;

public class User
{
    public static AccountTable? GetUserInfo(DatabaseContext dataContext, string account)
    {
        return dataContext.Accounts.FirstOrDefault(a => a.Account == account);
    }
}