namespace Polaris.Business.Models;

public class PLBizException : Exception
{
    public PLBizException(string message, int code = (int)PLCodes.Error) : base(message)
    {
        Code = code;
    }

    public static PLBizException BadRequest(string message)
    {
        return new PLBizException(message, (int)PLCodes.BadRequest);
    }

    public static PLBizException NotFound(string message)
    {
        return new PLBizException(message, (int)PLCodes.NotFound);
    }

    public static PLBizException Error(string message)
    {
        return new PLBizException(message);
    }

    public static PLBizException Unauthorized(string message)
    {
        return new PLBizException(message, (int)PLCodes.Unauthorized);
    }

    public PLBizException(int code = (int)PLCodes.Error, string publicMessage = "",
        string internalMessage = "") : base(publicMessage + "\n" + internalMessage)
    {
        Code = code;
        InternalMessage = internalMessage;
        PublicMessage = publicMessage;
    }

    public int Code { get; set; }
    public string InternalMessage { get; set; } = "";
    public string PublicMessage { get; set; } = "";

    public static PLBizException New(int code = (int)PLCodes.Error, string publicMessage = "",
        string internalMessage = "")
    {
        return new PLBizException(code, publicMessage, internalMessage);
    }

    public static PLBizException New(PLCodes code = PLCodes.Error, string publicMessage = "",
        string internalMessage = "")
    {
        return new PLBizException((int)code, publicMessage, internalMessage);
    }

}

public enum PLCodes
{
    Ok = 200,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    Error = 500,
    Pending = 600, // 业务处理中
    InvalidArgument = 601,
}

public class PLErrorDescription
{
    public int Code { get; set; }
    public string Message { get; set; } = "";

}

public class PLGetResult<T>
{
    public T? Model { get; init; }
}

public class PLSelectResult<T>
{
    public int Page { get; set; }
    public int Size { get; set; }
    public int Count { get; init; } = 0;
    public List<T> Range { get; init; } = new();
}

public class PLInsertResult
{
    public string Pk { get; set; } = "";
}

public class PLUpdateResult
{
    public int Changes { get; set; }
}

public class PLDeleteResult
{
    public int Changes { get; set; }
}