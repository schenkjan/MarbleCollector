using System.Collections.Generic;
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
                .Include(grant => grant.User);
        }
    }
}