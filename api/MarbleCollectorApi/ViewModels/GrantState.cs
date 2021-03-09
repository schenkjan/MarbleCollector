namespace MarbleCollectorApi.ViewModels
{
    /// <summary>
    /// Describes the state of a reward grant.
    /// </summary>
    public enum GrantState
    {
        /// <summary>
        /// The reward has been assigned/granted to a user.
        /// </summary>
        Assigned,

        /// <summary>
        /// The user has requested to claim the grant.
        /// </summary>
        Requested,

        /// <summary>
        /// The claim request has been confirmed.
        /// </summary>
        RequestConfirmed,

        /// <summary>
        /// The claim request has been refused.
        /// </summary>
        RequestRefused,

        /// <summary>
        /// The reward grant is archived.
        /// </summary>
        Archived
    }
}