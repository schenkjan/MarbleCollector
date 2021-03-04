export interface AssignmentWithChore {
    id: number;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
    userId: number;
    chore: Chore;
    state: AssignmentState;
}