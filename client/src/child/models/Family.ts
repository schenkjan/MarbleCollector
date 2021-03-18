import { User } from "../../parent/models/User";

export interface Family {
  parents: User[];
  children: User[];
}
