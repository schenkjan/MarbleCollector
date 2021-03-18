import { ChoreWithAssignments } from "../../parent/models/ChoreWithAssignments";

export interface ChoreLoadingData {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  data: ChoreWithAssignments[];
}
