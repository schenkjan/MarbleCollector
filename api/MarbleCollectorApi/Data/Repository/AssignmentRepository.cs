using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
                .Include(assignment => assignment.Chore) // ensure loading of Chore object
                .Include(assignment => assignment.User); // ensure loading of User object
        }

        public override Assignment GetSingle(int id)
        {
            return GetSingle(assignment => assignment.Id == id);
        }

        public override Assignment GetSingle(Expression<Func<Assignment, bool>> predicate)
        {
            return Context.Assignments
                .Include(assignment => assignment.Chore) // ensure loading of Chore object
                .Include(assignment => assignment.User) // ensure loading of User object
                .FirstOrDefault(predicate);
        }
    }
}