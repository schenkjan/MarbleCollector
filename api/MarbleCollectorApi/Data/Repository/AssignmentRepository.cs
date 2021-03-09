using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using MarbleCollectorApi.Data.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MarbleCollectorApi.Data.Repository
{
    // TODO js (04.03.2021): Replace mock implementation with database access logic (also using BaseEntityRepository<Assignment>).
    public class AssignmentRepository : IAssignmentRepository
    {
        public IEnumerable<Assignment> AllIncluding(params Expression<Func<Assignment, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Assignment> GetAll()
        {
            throw new NotImplementedException();
        }

        public int Count()
        {
            throw new NotImplementedException();
        }

        public Assignment GetSingle(int id)
        {
            throw new NotImplementedException();
        }

        public Assignment GetSingle(Expression<Func<Assignment, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Assignment GetSingle(Expression<Func<Assignment, bool>> predicate, params Expression<Func<Assignment, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Assignment> FindBy(Expression<Func<Assignment, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public EntityEntry<Assignment> Add(Assignment entity)
        {
            throw new NotImplementedException();
        }

        public EntityEntry<Assignment> Update(Assignment entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(Assignment entity)
        {
            throw new NotImplementedException();
        }

        public void DeleteWhere(Expression<Func<Assignment, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public void Commit()
        {
            throw new NotImplementedException();
        }
    }
}