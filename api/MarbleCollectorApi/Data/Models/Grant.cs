using MarbleCollectorApi.Data.Models.Core;

namespace MarbleCollectorApi.Data.Models
{
    /// <summary>
    /// Describes a reward grant, i.e. a reward, who it is granted to and the state of the grant.
    /// </summary>
    public class Grant : BaseEntity
    {
        public int UserId { get; set; }

        public int RewardId { get; set; }

        public User User { get; set; }
        //public virtual User User { get; set; } // TODO js (06.03.2021): Should we do lazy loading (enabled with virtual keyword)?

        public Reward Reward { get; set; }
        //public virtual Reward Reward { get; set; } // TODO js (06.03.2021): Should we do lazy loading (enabled with virtual keyword)?

        public GrantState State { get; set; }
    }
}