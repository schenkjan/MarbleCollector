using MarbleCollectorApi.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace MarbleCollectorApi.Data
{
    public class MarbleCollectorDbContext : DbContext
    {
        public DbSet<Chore> Chores { get; set; }

        public MarbleCollectorDbContext(DbContextOptions<MarbleCollectorDbContext> options)
            : base(options) { }
    }
}
