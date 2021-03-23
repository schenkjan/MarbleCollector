using MarbleCollectorApi.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarbleCollectorApi.Services
{
    public interface IUserScoreService
    {
        UserScore GetUserScore(int userId);
        IEnumerable<UserScore> GetUserScores(IEnumerable<int> userIds);
    }
}
