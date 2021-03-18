import { queryUrl } from "./QueryObjectUrl";
import { ChoreWithAssignments } from "../../parent/models/ChoreWithAssignments";

export interface QueryObject {
  url: queryUrl;
  object: ChoreWithAssignments;
  token: string;
}
