import axios, { AxiosResponse } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "react-query";
import { useRecoilValue } from "recoil";
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

interface RewardLoadingData {
  isLoading: boolean;
  error: unknown;
  rewards: RewardWithGrants[];
}

interface ChoreLoadingData {
  isLoading: boolean;
  error: unknown;
  chores: ChoreWithAssignments[];
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

export function useChildChoreData(id: number): ChoreLoadingData {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const { isLoading, error, data: chores } = useQuery("childChoreData", () =>
    axios
      .get<ChoreWithAssignments[]>(
        `${apiBaseUrl}/api/Chores/Assignments/Users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((data) => data?.data)
  );

  return { isLoading: isLoading, error: error, chores: chores ?? [] };
}

export function useUpdateChoreState(): UseMutationResult<
  AxiosResponse<Assignment>,
  unknown,
  Assignment,
  unknown
> {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (assignment: Assignment) =>
      axios.put<Assignment>(
        `${apiBaseUrl}/api/Assignments/${assignment.id}`,
        assignment,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("childChoreData");
      },
    }
  );

  return mutation;
}

export function useChildRewardData(id: number): RewardLoadingData {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const { isLoading, error, data: rewards } = useQuery("childRewardData", () =>
    axios
      .get<RewardWithGrants[]>(`${apiBaseUrl}/api/Rewards/Users/${id}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((data) => data?.data)
  );

  return { isLoading: isLoading, error: error, rewards: rewards ?? [] };
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
