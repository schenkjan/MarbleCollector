import { UserProfile } from "./UserProfile";

export interface ProfileData {
  isLoading: boolean;
  error: unknown;
  profile: UserProfile | undefined;
}
