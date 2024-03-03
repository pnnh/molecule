using System.Buffers.Binary;
using System.ComponentModel;
using System.Diagnostics;
using System.Text;
using Base62;
using Microsoft.AspNetCore.Mvc;
using Molecule.Helpers;

namespace Venus.Controllers;

[ApiController]
public class HomeController() : ControllerBase
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
        if (number == null)
        {
            number = ulong.MaxValue;
        }

        var base32String = MIDHelper.Default.ULongBase32(number.Value);
        builder.AppendLine($"ULID Base32: {base32String}\t{base32String.Length}");
        var ulongNumber = MIDHelper.Default.Base32ULong(base32String);
        builder.AppendLine($"ULID Base32 to ULong: {number}\t{ulongNumber}\t{ulongNumber == number}");

        var base58String = MIDHelper.Default.ULongBase58(number.Value);
        builder.AppendLine($"ULID Base58: {base58String}\t{base58String.Length}");
        ulongNumber = MIDHelper.Default.Base58ULong(base58String);
        builder.AppendLine($"ULID Base58 to ULong: {number}\t{ulongNumber}\t{ulongNumber == number}");

        return builder.ToString();
    }
}