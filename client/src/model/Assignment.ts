import { AssignmentState } from "./AssignmentState";

export interface Assignment {
  id: number;
  created?: Date;
  createdBy?: string;
  modified?: Date;
  modifiedBy?: string;
  userId: number;
  userName: string;
  choreId: number;
  state: AssignmentState;
}
