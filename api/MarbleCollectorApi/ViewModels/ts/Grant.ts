export interface Grant {
    id: number;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
    userId: number;
    rewardId: number;
    state: GrantState;
}