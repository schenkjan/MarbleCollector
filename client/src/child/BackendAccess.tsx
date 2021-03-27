import axios, { AxiosResponse } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "react-query";
import { useRecoilValue } from "recoil";
import { QueryObject } from "../api/models/QueryObject";
import { QueryProps } from "../api/models/QueryProps";
import { useGet, usePut } from "../api/Queries";
import { AppState } from "../AppState";
import { Assignment } from "../model/Assignment";
import { ChoreWithAssignments } from "../model/ChoreWithAssignments";
import { Grant } from "../model/Grant";
import { RewardWithGrants } from "../model/RewardWithGrants";
import { UserProfile } from "./models/UserProfile";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

interface ProfileData {
  isLoading: boolean;
  error: unknown;
  profile: UserProfile | undefined;
}

interface UserBalance {
  isLoading: boolean;
  error: unknown;
  balance: number | undefined;
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

export function useUpdateRewardState(): UseMutationResult<
  AxiosResponse<Grant>,
  unknown,
  Grant,
  unknown
> {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (grant: Grant) =>
      axios.put<Grant>(`${apiBaseUrl}/api/Grants/${grant.id}`, grant, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("childRewardData");
      },
    }
  );

  return mutation;
}

const choreProps: QueryProps = {
  getKey: "childChoreGet",
  getUrl: "/api/Chores/Assignments/Users/",
  getMessage: "Ämtli konnte nicht geladen werden!",
  postMessage: "Ämtli erstellt",
  putMessage: "Ämtli aktualisiert",
  deleteMessage: "Ämtli gelöscht",
  mutateUrl: "/api/Assignments/",
};

export const mutateChore = (object: any) =>
  ({
    url: choreProps.mutateUrl,
    object: object,
  } as QueryObject);

export const useChildChoreGet = (id: number) =>
  useGet<ChoreWithAssignments[]>(
    choreProps.getKey,
    choreProps.getUrl + id,
    choreProps.getMessage
  );

export const useChildChorePut = () =>
  usePut<ChoreWithAssignments>(choreProps.getKey, choreProps.putMessage);

const rewardProps: QueryProps = {
  getKey: "childRewardGet",
  getUrl: "/api/Rewards/Users/",
  getMessage: "Belohnungen konnten nicht geladen werden!",
  postMessage: "Belohnungen aktualisiert",
  putMessage: "Belohnung aktualisiert",
  deleteMessage: "Belohnung gelöscht",
  mutateUrl: "/api/Grants/",
};

export const useChildRewardGet = (id: number) =>
  useGet<RewardWithGrants[]>(
    rewardProps.getKey,
    rewardProps.getUrl + id,
    rewardProps.getMessage
  );

export const mutateReward = (object: any) =>
  ({
    url: rewardProps.mutateUrl,
    object: object,
  } as QueryObject);

export const useChildRewardPut = () =>
  usePut<RewardWithGrants>(rewardProps.getKey, rewardProps.putMessage);

export function useUserBalance(userId?: number): UserBalance {
  const userInfo = useRecoilValue(AppState.userInfo);
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryProfileUserId = userId ? userId : userInfo?.id;

  const { isLoading, error, data: balance } = useQuery("userBalance", () =>
    axios
      .get<number>(`${apiBaseUrl}/api/Users/${queryProfileUserId}/balance`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((data) => data?.data)
  );

  return { isLoading: isLoading, error: error, balance: balance };
}
