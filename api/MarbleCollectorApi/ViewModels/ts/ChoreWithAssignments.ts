export interface ChoreWithAssignments {
    id: number;
    name: string;
    description: string;
    value: number;
    dueDate: Date;
    assignments: Assignment[];
}