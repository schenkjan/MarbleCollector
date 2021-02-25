using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Repository.Core;
using System.Collections.Generic;

namespace MarbleCollectorApi.Data.Repository
{
    public interface IChoreRepository : IBaseEntityRepository<Chore>
    {
        IEnumerable<Chore> GetChores();
    }
}