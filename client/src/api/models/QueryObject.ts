import { queryUrl } from "./queryUrl";
import { AddChore } from "../../parent/models/AddChore";

export interface QueryObject {
  variant: queryUrl;
  object: AddChore;
  token: string;
}
