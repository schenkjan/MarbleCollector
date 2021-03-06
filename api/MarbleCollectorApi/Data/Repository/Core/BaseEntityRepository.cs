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
    /// Copied with pride ;-) from https://geekrodion.com/blog/asp-react-blog/authentication.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class BaseEntityRepository<T> : IBaseEntityRepository<T>
            where T : class, IBaseEntity, new()
    {
        protected readonly MarbleCollectorDbContext Context;

        public BaseEntityRepository(MarbleCollectorDbContext context)
        {
            Context = context;
        }
        public virtual IEnumerable<T> GetAll()
        {
            return Context.Set<T>().AsEnumerable();
        }

        public virtual int Count()
        {
            return Context.Set<T>().Count();
        }
        public virtual IEnumerable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Context.Set<T>();
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query.AsEnumerable();
        }

        public virtual T GetSingle(int id)
        {
            return GetSingle(x => x.Id == id);
        }

        public virtual T GetSingle(Expression<Func<T, bool>> predicate)
        {
            return Context.Set<T>().FirstOrDefault(predicate);
        }

        public virtual T GetSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Context.Set<T>();
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return query.Where(predicate).FirstOrDefault();
        }

        public virtual IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return Context.Set<T>().Where(predicate);
        }

        public virtual EntityEntry<T> Add(T entity)
        {
            EntityEntry<T> dbEntityEntry = Context.Entry(entity);
            Context.Set<T>().Add(entity);
            return dbEntityEntry;
        }

        public virtual EntityEntry<T> Update(T entity)
        {
            EntityEntry<T> dbEntityEntry = Context.Entry(entity);
            dbEntityEntry.State = EntityState.Modified;
            return dbEntityEntry;
        }
        public virtual void Delete(T entity)
        {
            EntityEntry dbEntityEntry = Context.Entry(entity);
            dbEntityEntry.State = EntityState.Deleted;
        }

        public virtual void DeleteWhere(Expression<Func<T, bool>> predicate)
        {
            IEnumerable<T> entities = Context.Set<T>().Where(predicate);

            foreach (var entity in entities)
            {
                Context.Entry(entity).State = EntityState.Deleted;
            }
        }

        public virtual void Commit()
        {
            Context.SaveChanges();
        }
    }
}