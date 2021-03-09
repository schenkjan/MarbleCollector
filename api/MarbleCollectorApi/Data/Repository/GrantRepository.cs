using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using MarbleCollectorApi.Data.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MarbleCollectorApi.Data.Repository
{
    // TODO js (04.03.2021): Replace mock implementation with database access logic (also using BaseEntityRepository<Grant>).
    public class GrantRepository : IGrantRepository
    {
        public IEnumerable<Grant> AllIncluding(params Expression<Func<Grant, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Grant> GetAll()
        {
            throw new NotImplementedException();
        }

        public int Count()
        {
            throw new NotImplementedException();
        }

        public Grant GetSingle(int id)
        {
            throw new NotImplementedException();
        }

        public Grant GetSingle(Expression<Func<Grant, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Grant GetSingle(Expression<Func<Grant, bool>> predicate, params Expression<Func<Grant, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Grant> FindBy(Expression<Func<Grant, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public EntityEntry<Grant> Add(Grant entity)
        {
            throw new NotImplementedException();
        }

        public EntityEntry<Grant> Update(Grant entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(Grant entity)
        {
            throw new NotImplementedException();
        }

        public void DeleteWhere(Expression<Func<Grant, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public void Commit()
        {
            throw new NotImplementedException();
        }
    }
}