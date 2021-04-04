using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Repository.Core;
using System.Collections.Generic;

namespace MarbleCollectorApi.Data.Repository
{
    public interface IGrantRepository : IBaseEntityRepository<Grant>
    {
        IEnumerable<Grant> GetCompletedGrants(int userId, IEnumerable<Grant> grants = null);
        IEnumerable<Grant> GetGrants(int userId);
        int GetMarblesReserved(int userId, IEnumerable<Grant> grants = null);
        int GetMarblesSpent(int userId, IEnumerable<Grant> grants = null);
    }
}