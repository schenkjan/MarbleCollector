export interface Assignment {
    id: number;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
    userId: number;
    choreId: number;
    state: AssignmentState;
}