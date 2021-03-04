using MarbleCollectorApi.Data.Init;
using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Models.Config;
using MarbleCollectorApi.Data.Models.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;

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
        public DbSet<Assignment> Assignments{ get; set; }
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
            new AssignementEntityTypeConfiguration().Configure(modelBuilder.Entity<Assignment>());
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

        public async void EnsureSeedData()
        {
            bool anyUsersSeeded = await Users.AnyAsync();
            bool anyChoresSeeded = await Chores.AnyAsync();
            bool anyRewardsSeeded = await Rewards.AnyAsync();
            bool anyAssignmentSeeded = await Assignments.AnyAsync();
            bool anyGrantsSeeded = await Grants.AnyAsync();

            if (!anyUsersSeeded)
            {
                Users.AddRange(DefaultFamily.GetUsers());
                SaveChanges();
            }

            if (!anyChoresSeeded)
            {
                Chores.AddRange(DefaultChores.GetChores());
                SaveChanges();
            }

            if (!anyRewardsSeeded)
            {
                Rewards.AddRange(DefaultRewards.GetRewards());
                SaveChanges();
            }

            if (!anyAssignmentSeeded)
            {
                Assignments.AddRange(DefaultAssignments.GetAssignments());
                SaveChanges();
            }

            if (!anyGrantsSeeded)
            {
                Grants.AddRange(DefaultGrants.GetGrants());
                SaveChanges();
            }
        }
    }
}