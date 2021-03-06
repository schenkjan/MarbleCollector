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