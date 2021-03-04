using System;
using MarbleCollectorApi.Data.Models;

namespace MarbleCollectorApi.ViewModels
{
    /// <summary>
    /// Describes a reward grant, i.e. a reward, who it is granted to and the state of the grant.
    /// </summary>
    public class Grant
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; } = string.Empty;

        public int UserId { get; set; }

        public int RewardId { get; set; }

        public GrantState State { get; set; }
    }
}