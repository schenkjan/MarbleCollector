using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Repository.Core;
using Microsoft.EntityFrameworkCore;

namespace MarbleCollectorApi.Data.Repository
{
    public class GrantRepository : BaseEntityRepository<Grant>, IGrantRepository
    {
        public GrantRepository(MarbleCollectorDbContext context) : base(context) { }

        public override IEnumerable<Grant> GetAll()
        {
            return Context.Grants
                .Include(grant => grant.User) // ensure loading of User object
                .Include(grant => grant.Reward); // ensure loading of Reward object
        }

        public IEnumerable<Grant> GetGrants(int userId)
        {
            return GetAll().Where(a => a.UserId == userId);
        }

        public IEnumerable<Grant> GetCompletedGrants(int userId, IEnumerable<Grant> grants = null)
        {
            if (grants == null)
            {
                grants = GetGrants(userId);
            }
            return grants.Where(grant => grant.State == GrantState.Archived);
        }

        public int GetMarblesReserved(int userId, IEnumerable<Grant> grants = null)
        {
            if (grants == null)
            {
                grants = GetGrants(userId);
            }

            var marbleCount = grants.Where(x =>
                x.State == GrantState.Requested ||
                x.State == GrantState.RequestConfirmed
            ).Sum(a => a.Reward.Value);
            return marbleCount;
        }

        public int GetMarblesSpent(int userId, IEnumerable<Grant> grants = null)
        {
            if (grants == null)
            {
                grants = GetCompletedGrants(userId);
            }

            var marbleCount = grants.Sum(a => a.Reward.Value);
            return marbleCount;
        }

        public override Grant GetSingle(int id)
        {
            return GetSingle(grant => grant.Id == id);
        }

        public override Grant GetSingle(Expression<Func<Grant, bool>> predicate)
        {
            return Context.Grants
                .Include(grant => grant.User) // ensure loading of User object
                .Include(grant => grant.Reward) // ensure loading of Reward object
                .FirstOrDefault(predicate);
        }
    }
}