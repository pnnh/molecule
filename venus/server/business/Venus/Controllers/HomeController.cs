using System.Buffers.Binary;
using System.ComponentModel;
using System.Diagnostics;
using System.Text;
using Base62;
using Microsoft.AspNetCore.Mvc;
using SimpleBase;
using Venus.Business.Helpers;

namespace Venus.Controllers;

[ApiController]
public class HomeController(ILogger<HomeController> logger) : ControllerBase
{
    [Route("/")]
    public string Index()
    {
        return "Venus业务接口服务";
    }

    [Route("/base")]
    public string Base(ulong? number)
    {
        var builder = new StringBuilder();
        var uuidBase64 = IDHelper.NewUUIDv7Base64Url();
        var uuid = IDHelper.NewUUIDv7();
        var data = uuid.AsByte();
        string result = Base58.Bitcoin.Encode(data);

        builder.AppendLine($"UUID: {uuid}\t{uuid.ToString().Length}");
        builder.AppendLine($"UUID Base64: {uuidBase64}\t{uuidBase64.Length}");
        builder.AppendLine($"UUID Base58: {result}\t{result.Length}");
        string base85Result = Base85.Ascii85.Encode(data);
        builder.AppendLine($"UUID Base85: {base85Result}\t{base85Result.Length}");

        var ulid = Ulid.NewUlid();
        builder.AppendLine($"ULID: {ulid}\t{ulid.ToString().Length}");
        var ulidBase32 = Base32.Rfc4648.Encode(ulid.ToByteArray());
        builder.AppendLine($"ULID Base32: {ulidBase32}\t{ulidBase32.Length}");
        var ulidBase64 = ulid.ToBase64();
        builder.AppendLine($"ULID Base64: {ulidBase64}\t{ulidBase64.Length}");

        var smallValue = number ?? 1868947;
        var smallString = GetBytesString((ulong)smallValue);
        builder.AppendLine($"SmallValue: {smallValue}\t{smallString}\t{smallString.Length}");
        var largeValue = 9_999_999_999_999;
        var largeString = GetBytesString((ulong)largeValue);
        builder.AppendLine($"LargeValue: {largeValue}\t{largeString}\t{largeString.Length}");

        var list = IntToBytes(smallValue);
        var base32String = Base32.Rfc4648.Encode(list.ToArray());
        builder.AppendLine($"base32String: {smallValue}\t{base32String.ToLower()}\t{base32String.Length}");


        return builder.ToString();
    }

    private byte[] IntToBytes(ulong intValue)
    {

        byte[] bytes = new byte[8];
        BinaryPrimitives.WriteUInt64BigEndian(bytes, intValue);
        logger.LogInformation($"Bytes: {intValue}-{string.Join(",", bytes)}");
        var list = new List<byte>();
        foreach (var b in bytes)
        {
            if (b != 0)
                list.Add(b);
        }
        logger.LogInformation($"==================Bytes22: {string.Join(",", list)}");


        return list.ToArray();
    }

    private string GetBytesString(ulong intValue)
    {
        var list = new List<byte>();
        list.AddRange(IntToBytes(intValue));


        var base58String = Base58.Flickr.Encode(list.ToArray());
        logger.LogInformation($"base58String========: {base58String}\t{base58String.Length}");

        var base62Converter = new Base62Converter();

        //var utf8String = Encoding.UTF8.GetString(list.ToArray());
        var encodedArray = base62Converter.Encode(list.ToArray());


        const string characterSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        StringBuilder stringBuilder = new StringBuilder();

        foreach (byte index in encodedArray)
        {
            stringBuilder.Append(characterSet[index]);
        }
        var encoded = stringBuilder.ToString();



        var itemCount = list.Count;
        for (var i = 0; i < 8 - itemCount; i++)
        {
            list.Insert(0, 0);
        }
        logger.LogInformation($"Bytes22--22: {string.Join(",", list)}");
        var newValue = BinaryPrimitives.ReadUInt64BigEndian(list.ToArray());
        logger.LogInformation($"newValue: {newValue}");

        //return encoded;
        return base58String;
    }

}