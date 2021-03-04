using System;
using MarbleCollectorApi.Data.Models;
using MarbleCollectorApi.Data.Models.Core;

namespace MarbleCollectorApi.Data.Dtos
{
    /// <summary>
    /// Describes a chore assignment, i.e. a chore, who it is assigned to and the state of the assignment.
    /// For convenience it contains detailed information about the actual chore.
    /// </summary>
    /// <remarks>
    /// This is only convenience DTO class and not an entity class, therefore it does not inherit from <see cref="BaseEntity"/>.
    /// </remarks>
    public class AssignmentWithChore
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; } = string.Empty;

        public int UserId { get; set; }

        public Chore Chore { get; set; }

        public AssignmentState State { get; set; }
    }
}