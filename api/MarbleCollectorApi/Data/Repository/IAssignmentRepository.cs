using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Repository.Core;
using System.Collections.Generic;

namespace MarbleCollectorApi.Data.Repository
{
    public interface IAssignmentRepository : IBaseEntityRepository<Assignment>
    {
        IEnumerable<Assignment> GetAssignments(int userId);
        IEnumerable<Assignment> GetCompletedAssignments(int userId, IEnumerable<Assignment> assignments = null);
        int GetMarblesEarned(int userId, IEnumerable<Assignment> assignments = null);
    }
}