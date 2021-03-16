export interface Grant {
    id: number;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
    userId: number;
    userName: string;
    rewardId: number;
    state: GrantState;
}