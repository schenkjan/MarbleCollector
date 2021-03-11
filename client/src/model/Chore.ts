import { ChoreAssignement } from "./ChoreAssignment";

export type Chore = {
    id: number;
    name: string;
    description: string;
    dueDate: number;
    value: number;
    assignments: ChoreAssignement[];
}