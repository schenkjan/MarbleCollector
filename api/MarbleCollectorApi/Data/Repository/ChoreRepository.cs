using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Repository.Core;
using System.Collections.Generic;

namespace MarbleCollectorApi.Data.Repository
{
    /// <summary>
    /// A repository of chores that contains chore specific query or mutation methods.
    /// </summary>
    public class ChoreRepository : BaseEntityRepository<Chore>, IChoreRepository
    {
        public ChoreRepository(MarbleCollectorDbContext context) : base(context) { }

        public IEnumerable<Chore> GetChores()
        {
            return GetAll();
        }

    }
}
