import { ChoreWithAssignments } from "../../parent/models/ChoreWithAssignments";

export interface ChoreLoadingData {
  isLoading: boolean;
  error: unknown;
  chores: ChoreWithAssignments[];
}
