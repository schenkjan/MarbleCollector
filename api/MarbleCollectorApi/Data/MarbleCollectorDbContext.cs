using MarbleCollectorApi.Data.Init;
using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Models.Config;
using MarbleCollectorApi.Data.Models.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace MarbleCollectorApi.Data
{
    /// <summary>
    /// Entity Framwork core class for accessing data.
    /// </summary>
    public class MarbleCollectorDbContext : DbContext
    {

        private const string SystemUser = "system";
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DbSet<Chore> Chores { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Grant> Grants { get; set; }
        public DbSet<Reward> Rewards { get; set; }

        public MarbleCollectorDbContext(DbContextOptions<MarbleCollectorDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Configure the models and the fields further with fluent API.
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new ChoreEntityTypeConfiguration().Configure(modelBuilder.Entity<Chore>());
            new UserEntityTypeConfiguration().Configure(modelBuilder.Entity<User>());
            new AssignmentEntityTypeConfiguration().Configure(modelBuilder.Entity<Assignment>());
            new GrantEntityTypeConfiguration().Configure(modelBuilder.Entity<Grant>());
            new RewardEntityTypeConfiguration().Configure(modelBuilder.Entity<Reward>());
        }

        /// <summary>
        /// Ensure that the creation and modification date get persisted, if available also the user.
        /// </summary>
        /// <returns></returns>
        public override int SaveChanges()
        {
            var currentUserName = _httpContextAccessor.HttpContext?.User != null ?
                _httpContextAccessor.HttpContext.User.Identity.Name : SystemUser;
            if (string.IsNullOrEmpty(currentUserName)) currentUserName = "unknown";
            foreach (var entry in ChangeTracker.Entries<IBaseEntity>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.Created = DateTime.Now;
                    entry.Entity.CreatedBy = currentUserName;
                    entry.Entity.Modified = DateTime.Now;
                    entry.Entity.ModifiedBy = currentUserName;
                }
                if (entry.State == EntityState.Modified)
                {
                    entry.Entity.Modified = DateTime.Now;
                    entry.Entity.ModifiedBy = currentUserName;
                }
            }

            return base.SaveChanges();
        }

        /// <summary>
        /// Will either purge all data and recreate demo data or will create test data if no data is present for development.
        /// </summary>
        /// <param name="isDevelopment"></param>
        public async void EnsureSeedData(bool isDevelopment)
        {
            if (isDevelopment)
            {
                await SeedIfDataNotAvailable();
            }
            else
            {
                await PurgeAndSeedDemoData();
            }
        }

        private async Task SeedIfDataNotAvailable()
        {
            await SeedDbSetIfNotAvailable(Users, new DefaultFamily());
            await SeedDbSetIfNotAvailable(Chores, new DefaultChores());
            await SeedDbSetIfNotAvailable(Rewards, new DefaultRewards());
            await SeedDbSetIfNotAvailable(Assignments, new DefaultAssignments());
            await SeedDbSetIfNotAvailable(Grants, new DefaultGrants());
        }

        private async Task SeedDbSetIfNotAvailable<TEntity>(DbSet<TEntity> dbSet, IDataSeeder<TEntity> dataSeeder) where TEntity : class
        {
            bool anyDataAvailable = await dbSet.AnyAsync();
            if (!anyDataAvailable)
            {
                dbSet.AddRange(dataSeeder.GetDevelopmentData());
                SaveChanges();
            }
        }

        private async Task PurgeAndSeedDemoData()
        {
            // recreate database from scratch (so that ids get reset)
            Database.EnsureDeleted();
            Database.Migrate();

            Users.AddRange(new DefaultFamily().GetDemoData());
            await SaveChangesAsync();
            Chores.AddRange(new DefaultChores().GetDemoData());
            await SaveChangesAsync();
            Rewards.AddRange(new DefaultRewards().GetDemoData());
            await SaveChangesAsync();
            Assignments.AddRange(new DefaultAssignments().GetDemoData());
            await SaveChangesAsync();
            Grants.AddRange(new DefaultGrants().GetDemoData());
            await SaveChangesAsync();
        }
    }
}