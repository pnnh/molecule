
using Gliese.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Markdig;
using Gliese.Utils;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Gliese.Models
{

    public class ResourceMetadata
    { 
    }

    [Table("resources")]
    [PrimaryKey(nameof(Pk))]
    public class ResourceTable
    {
        [Column("pk")]
        public string Pk { get; set; } = "";

        [Column("create_time")]
        [JsonPropertyName("create_time")]
        public DateTime CreateTime { get; set; } = DateTime.UtcNow;

        [Column("update_time")]
        [JsonPropertyName("update_time")]
        public DateTime UpdateTime { get; set; } = DateTime.UtcNow;

        [Column("title")]
        public string Title { get; set; } = "";

        [Column("metadata", TypeName = "jsonb")]
        public ResourceMetadata Metadata { get; set; } = new ResourceMetadata();

        [Column("content")]
        public JsonDocument Content { get; set; } = JsonDocument.Parse("{}");

        [Column("creator")]
        public string Creator { get; set; } = "";

        [Column("tags")]
        public string? Tags { get; set; } = "";

        [Column("description")]
        public string? Description { get; set; } = "";

        [Column("status")]
        public int Status { get; set; } = 0;

        [Column("version")]
        public int Version { get; set; } = 0;

        [Column("mime")]
        public string Mime { get; set; } = "";
        
        [Column("size")]
        public long Size { get; set; } = 0;
        
        [Column("uri")]
        public string Uri { get; set; } = "";

        [NotMapped]
        [JsonPropertyName("parsed_uri")]
        public string ParsedUri
        {
            get
            {
                
                var storageUri = new Uri(this.Uri);
                var uriPath = storageUri.AbsolutePath;
                var parsedUri = uriPath; 
                if (uriPath.StartsWith("//"))
                {
                    parsedUri = uriPath.Substring(1);
                }

                return parsedUri;
            }
        }

        public void Dispose() => Content?.Dispose();
    }

}
