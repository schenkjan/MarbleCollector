export interface AssignmentWithChore {
    id: number;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
    userId: number;
    userName: string;
    chore: Chore;
    state: AssignmentState;
}