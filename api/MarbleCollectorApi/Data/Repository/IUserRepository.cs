using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Repository.Core;

namespace MarbleCollectorApi.Data.Repository
{
    public interface IUserRepository : IBaseEntityRepository<User>
    {
        User GetUser(string username);
    }
}