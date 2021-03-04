using MarbleCollectorApi.Data.Models.Core;

namespace MarbleCollectorApi.Data.Models
{
    /// <summary>
    /// Describes a reward grant, i.e. a reward, who it is granted to and the state of the grant.
    /// </summary>
    public class Grant : BaseEntity
    {
        public User User { get; set; }

        public Reward Reward { get; set; }

        public GrantState State { get; set; }
    }
}