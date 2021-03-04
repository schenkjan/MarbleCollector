using System;
using MarbleCollectorApi.Data.Models;

namespace MarbleCollectorApi.Data.Dtos
{
    /// <summary>
    /// Describes a chore assignment, i.e. a chore, who it is assigned to and the state of the assignment.
    /// </summary>
    public class Assignment
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; } = string.Empty;

        public int UserId { get; set; }

        public int Choreid { get; set; }

        public AssignmentState State { get; set; }
    }
}