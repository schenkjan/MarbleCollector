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

        public Task<bool> Login(string username, string password)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Logout(string username, string password)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUser(string username)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUsersByFamily(string family)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUsersByRoleAndFamily(string family, string role)
        {
            throw new NotImplementedException();
        }
    }
}
