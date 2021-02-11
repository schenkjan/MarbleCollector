
namespace MarbleCollectorApi.Data.Models
{
    public class Chore : EntityBase
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
