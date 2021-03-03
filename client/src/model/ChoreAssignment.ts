import { Child } from "./Child";

export type ChoreAssignement = {
    isDone: boolean;
    isConfirmed: boolean;
    assignee: Child;
}