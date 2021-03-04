using System;
using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Models.Core;

namespace MarbleCollectorApi.Data.Dtos
{
    /// <summary>
    /// Describes a reward grant, i.e. a reward, who it is granted to and the state of the grant.
    /// For convenience it contains detailed information about the actual reward.
    /// </summary>
    /// <remarks>
    /// This is only convenience DTO class and not an entity class, therefore it does not inherit from <see cref="BaseEntity"/>.
    /// </remarks>
    public class GrantWithReward
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; } = string.Empty;

        public int UserId { get; set; }

        public Reward Reward { get; set; }

        public GrantState State { get; set; }
    }
}