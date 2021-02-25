
using MarbleCollectorApi.Data.Models.Core;

namespace MarbleCollectorApi.Data.Models
{
    public class Chore : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
