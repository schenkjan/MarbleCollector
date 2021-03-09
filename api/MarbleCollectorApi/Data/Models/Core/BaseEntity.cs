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

        public override bool Equals(object obj)
        {
            return Equals(obj as BaseEntity);
        }

        protected bool Equals(BaseEntity other)
        {
            if (other == null) return false;
            if (ReferenceEquals(this, other)) return true;

            return Id == other.Id;
        }

        public override int GetHashCode()
        {
            return Id;
        }
    }
}