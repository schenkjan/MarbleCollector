
using System;
using MarbleCollectorApi.Data.Models.Core;
using System;

namespace MarbleCollectorApi.Data.Models
{
    public class Chore : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Value { get; set; }
        public DateTime DueDate { get; set; }
    }
}
