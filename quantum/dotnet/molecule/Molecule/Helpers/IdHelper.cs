using System.Text;
using Base62;
using IdGen;

namespace Molecule.Helpers;

internal class TestTimeSource : ITimeSource
{
    public DateTimeOffset Epoch { get; } = new(2023, 6, 1, 0, 0, 0, TimeSpan.Zero);

    public TimeSpan TickDuration { get; } = TimeSpan.FromMilliseconds(1);

    public long GetTicks()
    {
        return (long)(DateTimeOffset.UtcNow - Epoch).TotalMilliseconds;
    }
}

public class BizIdendity
{
    public BizIdendity(long id)
    {
        Id = id;
    }

    private long Id { get; }

    public long LongValue()
    {
        return Id;
    }

    public string StringValue()
    {
        var bytes = BitConverter.GetBytes(Id);
        if (BitConverter.IsLittleEndian)
            Array.Reverse(bytes);

        var base62Converter = new Base62Converter(Base62Converter.CharacterSet.INVERTED);
        const string invertedCharacterSet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var numArray = base62Converter.Encode(bytes);
        var stringBuilder = new StringBuilder();
        foreach (var index in numArray)
            stringBuilder.Append(invertedCharacterSet[index]);
        return stringBuilder.ToString().TrimStart('0');
    }

    public override string ToString()
    {
        return StringValue();
    }
}

public abstract class IdHelper
{
    static IdHelper()
    {
        var structure = new IdStructure(47, 6, 10);

        var options = new IdGeneratorOptions(structure, new TestTimeSource());

        Generator = new IdGenerator(0, options);
    }

    private static IdGenerator Generator { get; }

    public static BizIdendity NewIdendity()
    {
        return new BizIdendity(Generator.CreateId());
    }

    public static string LongToBase62(long id)
    {
        return new BizIdendity(id).StringValue();
    }
}