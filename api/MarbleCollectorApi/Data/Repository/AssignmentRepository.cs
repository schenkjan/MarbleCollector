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

        public IEnumerable<Assignment> GetAssignments(int userId)
        {
            return GetAll().Where(a => a.UserId == userId);
        }

        public IEnumerable<Assignment> GetCompletedAssignments(int userId, IEnumerable<Assignment> assignments = null)
        {
            if (assignments == null)
            {
                assignments = GetAssignments(userId);
            }
            return assignments.Where(assignment => assignment.State == AssignmentState.Archived);
        }

        public int GetMarblesEarned(int userId, IEnumerable<Assignment> assignments = null)
        {
            if (assignments == null)
            {
                assignments = GetCompletedAssignments(userId);
            }

            var marbleCount = assignments.Sum(a => a.Chore.Value);
            return marbleCount;
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