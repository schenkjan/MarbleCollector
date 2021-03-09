using MarbleCollectorApi.Data.Models.Core;

namespace MarbleCollectorApi.Data.Models
{
    /// <summary>
    /// Describes a chore assignment, i.e. a chore, who it is assigned to and the state of the assignment.
    /// </summary>
    public class Assignment : BaseEntity
    {
        public int UserId { get; set; }

        public int ChoreId { get; set; }

        public User User { get; set; }
        //public virtual User User { get; set; } // TODO js (06.03.2021): Should we do lazy loading (enabled with virtual keyword)?

        public Chore Chore { get; set; }
        //public virtual Chore Chore { get; set; } // TODO js (06.03.2021): Should we do lazy loading (enabled with virtual keyword)?

        public AssignmentState State { get; set; }
    }
}