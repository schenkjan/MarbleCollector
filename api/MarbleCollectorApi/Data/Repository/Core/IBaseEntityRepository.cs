using MarbleCollectorApi.Data.Models.Core;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace MarbleCollectorApi.Data.Repository.Core
{
    /// <summary>
    /// Interface describing basic interaction possibility with Database.
    /// Stolen from https://geekrodion.com/blog/asp-react-blog/authentication
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IBaseEntityRepository<T> where T : class, IBaseEntity, new()
    {
        IEnumerable<T> AllIncluding(
          params Expression<Func<T, object>>[] includeProperties
        );
        IEnumerable<T> GetAll();
        int Count();
        T GetSingle(int id);
        T GetSingle(Expression<Func<T, bool>> predicate);
        T GetSingle(
          Expression<Func<T, bool>> predicate,
          params Expression<Func<T, object>>[] includeProperties
        );
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        EntityEntry<T> Add(T entity);
        EntityEntry<T> Update(T entity);
        void Delete(T entity);
        void DeleteWhere(Expression<Func<T, bool>> predicate);
        void Commit();
    }
}
