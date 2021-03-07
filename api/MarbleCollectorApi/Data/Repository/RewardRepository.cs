using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Repository.Core;
using System.Collections.Generic;

namespace MarbleCollectorApi.Data.Repository
{
    /// <summary>
    /// A repository of chores that contains chore specific query or mutation methods.
    /// </summary>
    public class RewardRepository : BaseEntityRepository<Reward>, IRewardRepository
    {
        public RewardRepository(MarbleCollectorDbContext context) : base(context) { }

        public IEnumerable<Reward> GetRewards()
        {
            return GetAll();
        }

    }
}
