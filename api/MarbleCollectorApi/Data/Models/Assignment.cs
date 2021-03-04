using MarbleCollectorApi.Data.Models.Core;

namespace MarbleCollectorApi.Data.Models
{
    /// <summary>
    /// Describes a chore assignment, i.e. a chore, who it is assigned to and the state of the assignment.
    /// </summary>
    public class Assignment : BaseEntity
    {
        public User User { get; set; }

        public Chore Chore { get; set; }

        public AssignmentState State { get; set; }
    }
}