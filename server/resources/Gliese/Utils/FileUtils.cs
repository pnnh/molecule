namespace Gliese.Services;

public class ResourceFileInfo
{
    public string FileName { get; set; } = "";
    public string FilePath { get; set; } = "";
    public long FileSize { get; set; }
}

public class FileUtils
{
    public static async Task<ResourceFileInfo?> SaveFiles(string storagePath, List<IFormFile> files)
    {
        var storageUri = new Uri(storagePath);
        var uriPath = storageUri.AbsolutePath;
        var savePath = uriPath; 
        if (uriPath.StartsWith("//"))
        {
            savePath = Directory.GetCurrentDirectory() + uriPath.Substring(1);
        }  

        foreach (var formFile in files)
        {
            if (formFile.Length > 0)
            {
                var ext = Path.GetExtension(formFile.FileName);
                var saveFileName = $"{Guid.NewGuid()}{ext}";
                var filePath = $"{savePath}/{saveFileName}";

                await using var stream = System.IO.File.Create(filePath);
                await formFile.CopyToAsync(stream);
                var fileInfo = new ResourceFileInfo
                {
                    FileName = saveFileName,
                    FilePath = $"{storagePath}/{saveFileName}",
                    FileSize = formFile.Length
                };
                return fileInfo;
            }
        }

        return null;
    }
}