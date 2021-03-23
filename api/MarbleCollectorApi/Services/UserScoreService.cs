using MarbleCollectorApi.Data.Repository;
using MarbleCollectorApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MarbleCollectorApi.Services
{
    public class UserScoreService : IUserScoreService
    {
        private readonly IAssignmentRepository _assignmentRepository;
        private readonly IGrantRepository _grantRepository;

        public UserScoreService(IAssignmentRepository assignmentRepository, IGrantRepository grantRepository)
        {
            _assignmentRepository = assignmentRepository;
            _grantRepository = grantRepository;
        }

        public UserScore GetUserScore(int userId)
        {
            var choreAssignments = _assignmentRepository.GetAssignments(userId);
            var choreAssignmentsCompleted = _assignmentRepository.GetCompletedAssignments(userId, choreAssignments); // saving a trip to the db
            var marblesEarned = _assignmentRepository.GetMarblesEarned(userId, choreAssignmentsCompleted);

            var rewardGrants = _grantRepository.GetGrants(userId);
            var rewardGrantsCompleted = _grantRepository.GetCompletedGrants(userId, rewardGrants);
            var marblesSpent = _grantRepository.GetMarblesSpent(userId, rewardGrants);

            return new UserScore
            {
                Id = userId,
                FamilyRank = 0, // can not be determined here...
                ChoreAssignments = choreAssignments.Count(),
                ChoreAssignmentsCompleted = choreAssignmentsCompleted.Count(),
                RewardGrants = rewardGrants.Count(),
                RewardsGrantsCompleted = rewardGrantsCompleted.Count(),
                MarblesEarned = marblesEarned,
                MarblesSpent = marblesSpent,
                MarbleBalance = marblesEarned - marblesSpent,
            };
        }

        public IEnumerable<UserScore> GetUserScores(IEnumerable<int> userIds)
        {
            var userScores = new List<UserScore>();
            foreach (var userId in userIds)
            {
                userScores.Add(GetUserScore(userId));
            }

            var userScoresOrdered = userScores.OrderByDescending(score => score.MarbleBalance).ToArray();
            userScores.ForEach(userScore => userScore.FamilyRank = Array.IndexOf(userScoresOrdered, userScore) + 1);
            return userScores;
        }
    }
}
