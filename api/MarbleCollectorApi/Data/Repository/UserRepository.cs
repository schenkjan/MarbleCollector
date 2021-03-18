using System;
using System.Threading.Tasks;
using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Repository.Core;

namespace MarbleCollectorApi.Data.Repository
{
    /// <summary>
    /// A repository of users that contains user specific query or mutation methods.
    /// </summary>
    public class UserRepository : BaseEntityRepository<User>, IUserRepository
    {
        public UserRepository(MarbleCollectorDbContext context) : base(context) { }
        public User GetUser(string username)
        {
            return GetSingle(user => user.Username.Equals(username));
        }
    }
}
