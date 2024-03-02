namespace Venus.Business.Helpers;

using System.Collections.Specialized;
using System.Text;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;

public class IDHelper
{
    public static string NewUUIDv7String()
    {

        var uuid = DaanV2.UUID.V7.Generate();

        return uuid.ToString();
    }

    public static string NewUUIDv7Base64Url()
    {

        var uuid = DaanV2.UUID.V7.Generate();
        var base64String = Base64UrlEncoder.Encode(uuid.AsByte());
        return base64String;
    }

    public static DaanV2.UUID.UUID NewUUIDv7()
    {
        return DaanV2.UUID.V7.Generate();
    }
}