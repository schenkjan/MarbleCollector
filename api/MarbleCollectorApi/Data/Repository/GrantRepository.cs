using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Repository.Core;

namespace MarbleCollectorApi.Data.Repository
{
    public class GrantRepository : BaseEntityRepository<Grant>, IGrantRepository
    {
        public GrantRepository(MarbleCollectorDbContext context) : base(context) { }
    }
}