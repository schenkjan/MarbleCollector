import { Assignment } from "./Assignment";

export type Chore = {
  id: number;
  name: string;
  description: string;
  dueDate: number;
  value: number;
  assignments: Assignment[];
};
