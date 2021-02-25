using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Repository.Core;
using System.Threading.Tasks;

namespace MarbleCollectorApi.Data.Repository
{
    public interface IUserRepository : IBaseEntityRepository<User>
    {
        Task<User> GetUser(string username);
        Task<User> GetUsersByFamily(string family);
        Task<User> GetUsersByRoleAndFamily(string family, string role);
        Task<bool> Login(string username, string password);
        Task<bool> Logout(string username, string password);
    }
}