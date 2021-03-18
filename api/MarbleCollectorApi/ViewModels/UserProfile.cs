using System.Collections.Generic;

namespace MarbleCollectorApi.ViewModels
{
    public class UserProfile
    {
        public User User { get; set; }
        public IEnumerable<User> Family { get; set; }
        public UserScore Score { get; set; }
    }
}
