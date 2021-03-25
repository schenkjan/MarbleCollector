import axios from "axios";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { UserProfile } from "./models/UserProfile";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

interface ProfileData {
  isLoading: boolean;
  error: unknown;
  profile: UserProfile | undefined;
}

export function useProfileData(userId?: number): ProfileData {
  const userInfo = useRecoilValue(AppState.userInfo);
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryProfileUserId = userId ? userId : userInfo?.id;

  const { isLoading, error, data: profile } = useQuery("userProfile", () =>
    axios
      .get<UserProfile>(
        `${apiBaseUrl}/api/Users/${queryProfileUserId}/profile`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((data) => data?.data)
  );

  return { isLoading: isLoading, error: error, profile: profile };
}
