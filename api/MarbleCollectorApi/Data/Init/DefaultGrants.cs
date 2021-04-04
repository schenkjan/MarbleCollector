using MarbleCollectorApi.Data.Models;
using System.Collections.Generic;

namespace MarbleCollectorApi.Data.Init
{
    public class DefaultGrants : IDataSeeder<Grant>
    {
        public IEnumerable<Grant> GetDemoData()
        {
            return new[]
            {
                new Grant
                {
                    UserId = 3,
                    RewardId = 1,
                    State = GrantState.Assigned
                },
                new Grant
                {
                    UserId = 3,
                    RewardId = 2,
                    State = GrantState.Assigned
                },
                new Grant
                {
                    UserId = 4,
                    RewardId = 1,
                    State = GrantState.Archived
                },
                new Grant
                {
                    UserId = 4,
                    RewardId = 2,
                    State = GrantState.Assigned
                },
            };
        }

        public IEnumerable<Grant> GetDevelopmentData()
        {
            return new[]
            {
                new Grant
                {
                    UserId = 3,
                    RewardId = 1,
                    State = GrantState.Assigned
                },
                new Grant
                {
                    UserId = 4,
                    RewardId = 1,
                    State = GrantState.Assigned
                },
                new Grant
                {
                    UserId = 5,
                    RewardId = 1,
                    State = GrantState.Assigned
                },
                new Grant
                {
                    UserId = 3,
                    RewardId = 2,
                    State = GrantState.Archived
                },
                new Grant
                {
                    UserId = 4,
                    RewardId = 2,
                    State = GrantState.Requested
                },
                new Grant
                {
                    UserId = 5,
                    RewardId = 2,
                    State = GrantState.RequestRefused
                },
                new Grant
                {
                    UserId = 3,
                    RewardId = 3,
                    State = GrantState.RequestConfirmed
                },
                new Grant
                {
                    UserId = 4,
                    RewardId = 3,
                    State = GrantState.Assigned
                },
                new Grant
                {
                    UserId = 5,
                    RewardId = 3,
                    State = GrantState.Archived
                },
            };
        }
    }
}