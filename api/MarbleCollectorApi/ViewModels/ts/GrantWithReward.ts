export interface GrantWithReward {
    id: number;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
    userId: number;
    reward: Reward;
    state: GrantState;
}