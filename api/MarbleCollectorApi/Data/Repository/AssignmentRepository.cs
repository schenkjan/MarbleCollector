using System.Collections.Generic;
using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Repository.Core;
using Microsoft.EntityFrameworkCore;

namespace MarbleCollectorApi.Data.Repository
{
    public class AssignmentRepository : BaseEntityRepository<Assignment>, IAssignmentRepository
    {
        public AssignmentRepository(MarbleCollectorDbContext context) : base(context) { }

        public override IEnumerable<Assignment> GetAll()
        {
            return Context.Assignments
                .Include(assignment => assignment.Chore)
                .Include(assignment => assignment.User);
        }
    }
}