namespace MarbleCollectorApi.ViewModels
{
    /// <summary>
    /// Describes the state of an chore assignment.
    /// </summary>
    public enum AssignmentState
    {
        /// <summary>
        /// The chore has been assigned to a user.
        /// </summary>
        Assigned,

        /// <summary>
        /// The chore is in progress/active.
        /// </summary>
        Active,

        /// <summary>
        /// The user has finished the chore and requests a review.
        /// </summary>
        RequestedToCheck,

        /// <summary>
        /// The chore has been confirmed as done.
        /// </summary>
        CheckConfirmed,

        /// <summary>
        /// The chore has not been done correctly and the check is therefore refused.
        /// </summary>
        CheckRefused,

        /// <summary>
        /// The chore assignment is archived.
        /// </summary>
        Archived
    }
}