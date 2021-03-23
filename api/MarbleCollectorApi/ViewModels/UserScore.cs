namespace MarbleCollectorApi.ViewModels
{
    public class UserScore
    {
        public int Id { get; set; }
        public int FamilyRank { get; set; }
        public int MarblesEarned { get; set; }
        public int MarblesSpent { get; set; }
        public int MarbleBalance { get; set; }
        public int ChoreAssignments { get; set; }
        public int ChoreAssignmentsCompleted { get; set; }
        public int RewardGrants { get; set; }
        public int RewardsGrantsCompleted { get; set; }
    }
}
