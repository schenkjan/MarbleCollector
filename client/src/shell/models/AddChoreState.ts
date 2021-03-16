import { Assignment } from "../../parent/models/Assignment";

export interface AddChoreState {
  name: string;
  description: string;
  value: number;
  dueDate: Date;
}
