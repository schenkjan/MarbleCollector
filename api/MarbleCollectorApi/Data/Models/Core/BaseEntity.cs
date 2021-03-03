using System;

namespace MarbleCollectorApi.Data.Models.Core
{
    public class BaseEntity : IBaseEntity
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; } = string.Empty;
    }
}