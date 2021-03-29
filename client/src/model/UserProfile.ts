import { User } from "./User";
import { UserScore } from "./UserScore";

export interface UserProfile {
  user: User;
  family: User[];
  score: UserScore;
}
