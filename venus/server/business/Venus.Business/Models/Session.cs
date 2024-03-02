

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Venus.Business.Models
{

    [Table("sessions")]
    [PrimaryKey(nameof(Pk))]
    public class SessionTable
    {
        [Column("pk", TypeName = "varchar(64)")]
        public string Pk { get; set; } = "";

        [Column("content", TypeName = "text")]
        public string Content { get; set; } = "";

        [Column("user", TypeName = "varchar(64)")]
        public string User { get; set; } = "";

        [Column("type", TypeName = "varchar(64)")]
        public string Type { get; set; } = "";

        [Column("create_time", TypeName = "timestamptz")]
        public DateTime CreateTime { get; set; } = DateTime.MinValue;

        [Column("update_time", TypeName = "timestamptz")]
        public DateTime UpdateTime { get; set; } = DateTime.MinValue;
    }

    public class SessionModel
    {
        public string Pk { get; set; } = "";
        public string User { get; set; } = "";
        public string Type { get; set; } = "";
        public DateTime CreateTime { get; set; } = DateTime.MinValue;
        public DateTime UpdateTime { get; set; } = DateTime.MinValue;
    }
}
