
namespace Molecule.Models
{
    public class CommonResult<T>
    {
        public Codes Code { get; init; } = Codes.Ok;
        public string? Message { get; init; } = "";
        public T? Data { get; init; } = default(T);
    }

    public class SelectData<T>
    {
        public int Count { get; init; } = 0;
        public List<T> List { get; init; } = new List<T>();
    }

    public class SelectResult<T> : CommonResult<SelectData<T>> { }
}