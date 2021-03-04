using MarbleCollectorApi.Data.Models;

namespace MarbleCollectorApi.Data.Init
{
    public static class DefaultAssignments
    {
        public static Assignment[] GetAssignments()
        {
            return new[]
            {
                new Assignment
                {
                    UserId = 3,
                    ChoreId = 1,
                    State = AssignmentState.Assigned
                },
                new Assignment
                {
                    UserId = 4,
                    ChoreId = 2,
                    State = AssignmentState.RequestedToCheck
                },
                new Assignment
                {
                    UserId = 5,
                    ChoreId = 3,
                    State = AssignmentState.Archived
                },
            };
        }
    }
}