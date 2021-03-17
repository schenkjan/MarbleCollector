import { queryUrl } from "./queryUrl";
import { ChoreWithAssignments } from "../../parent/models/ChoreWithAssignments";

export interface QueryObject {
  variant: queryUrl;
  object: ChoreWithAssignments;
  token: string;
}
