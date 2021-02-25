using MarbleCollectorApi.Data.Models.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace MarbleCollectorApi.Data.Repository.Core
{
    /// <summary>
    /// Class implementing basic interaction possibility with Database.
    /// Stolen from https://geekrodion.com/blog/asp-react-blog/authentication
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class BaseEntityRepository<T> : IBaseEntityRepository<T>
            where T : class, IBaseEntity, new()
    {
        private MarbleCollectorDbContext _context;

        public BaseEntityRepository(MarbleCollectorDbContext context)
        {
            _context = context;
        }
        public virtual IEnumerable<T> GetAll()
        {
            return _context.Set<T>().AsEnumerable();
        }

        public virtual int Count()
        {
            return _context.Set<T>().Count();
        }
        public virtual IEnumerable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _context.Set<T>();
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query.AsEnumerable();
        }

        public T GetSingle(int id)
        {
            return _context.Set<T>().FirstOrDefault(x => x.Id == id);
        }

        public T GetSingle(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().FirstOrDefault(predicate);
        }

        public T GetSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _context.Set<T>();
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return query.Where(predicate).FirstOrDefault();
        }

        public virtual IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(predicate);
        }

        public virtual EntityEntry<T> Add(T entity)
        {
            EntityEntry<T> dbEntityEntry = _context.Entry(entity);
            _context.Set<T>().Add(entity);
            return dbEntityEntry;
        }

        public virtual EntityEntry<T> Update(T entity)
        {
            EntityEntry<T> dbEntityEntry = _context.Entry(entity);
            dbEntityEntry.State = EntityState.Modified;
            return dbEntityEntry;
        }
        public virtual void Delete(T entity)
        {
            EntityEntry dbEntityEntry = _context.Entry(entity);
            dbEntityEntry.State = EntityState.Deleted;
        }

        public virtual void DeleteWhere(Expression<Func<T, bool>> predicate)
        {
            IEnumerable<T> entities = _context.Set<T>().Where(predicate);

            foreach (var entity in entities)
            {
                _context.Entry(entity).State = EntityState.Deleted;
            }
        }

        public virtual void Commit()
        {
            _context.SaveChanges();
        }
    }
}