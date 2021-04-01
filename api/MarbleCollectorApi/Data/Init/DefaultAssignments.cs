using MarbleCollectorApi.Data.Models;
using System.Collections.Generic;

namespace MarbleCollectorApi.Data.Init
{
    public class DefaultAssignments : IDataSeeder<Assignment>
    {
        public IEnumerable<Assignment> GetDemoData()
        {
            return new[]
            {
                new Assignment
                {
                    UserId = 3,
                    ChoreId = 1,
                    State = AssignmentState.Archived
                },
                new Assignment
                {
                    UserId = 4,
                    ChoreId = 1,
                    State = AssignmentState.Archived
                },
            };
        }

        public IEnumerable<Assignment> GetDevelopmentData()
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
                    ChoreId = 1,
                    State = AssignmentState.RequestedToCheck
                },
                new Assignment
                {
                    UserId = 5,
                    ChoreId = 1,
                    State = AssignmentState.Archived
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
                new Assignment
                {
                    UserId = 3,
                    ChoreId = 5,
                    State = AssignmentState.Assigned
                },
                new Assignment
                {
                    UserId = 4,
                    ChoreId = 5,
                    State = AssignmentState.Active
                },
                new Assignment
                {
                    UserId = 5,
                    ChoreId = 5,
                    State = AssignmentState.CheckRefused
                },
                new Assignment
                {
                    UserId = 3,
                    ChoreId = 6,
                    State = AssignmentState.Archived
                },
                new Assignment
                {
                    UserId = 4,
                    ChoreId = 6,
                    State = AssignmentState.Active
                },
                new Assignment
                {
                    UserId = 5,
                    ChoreId = 6,
                    State = AssignmentState.CheckRefused
                },
                new Assignment
                {
                    UserId = 3,
                    ChoreId = 7,
                    State = AssignmentState.Archived
                },
                new Assignment
                {
                    UserId = 4,
                    ChoreId = 7,
                    State = AssignmentState.Active
                },
                new Assignment
                {
                    UserId = 5,
                    ChoreId = 7,
                    State = AssignmentState.CheckRefused
                },
            };
        }
    }
}