import axios, { AxiosResponse } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "react-query";
import { useRecoilValue } from "recoil";
import { QueryProps } from "../api/models/QueryProps";
import { useGet } from "../api/Queries";
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

//Backendaccess new style

// Settings for Chores on Parent-Dashboard
const choreProps: QueryProps = {
  getKey: "childChoreGet", // Choose a unique keyname
  getUrl: "/api/Chores/Assignments/Users/", // GET-Url from Swagger UI
  getMessage: "Ämtli konnten nicht geladen werden!", // GET-Message to Snack
  postMessage: "Ämtli erstellt", // POST-Message to Snack
  putMessage: "Ämtli aktualisiert", // PUT-Message to Snack
  deleteMessage: "Ämtli gelöscht", // DELETE-Mesage to Snack
  mutateUrl: "/api/Chores/", // POST/PUT/DELETE-Url from Swagger UI
};

// GET - load all Chores on Parent-Dashboard
export const useChildChoreGet = (id: number) =>
  useGet<ChoreWithAssignments[]>(
    choreProps.getKey,
    choreProps.getUrl + id,
    choreProps.getMessage
  );

// Settings for Chores on Parent-Dashboard
const rewardProps: QueryProps = {
  getKey: "childRewardGet", // Choose a unique keyname
  getUrl: "/api/Rewards/Users/", // GET-Url from Swagger UI
  getMessage: "Belohnungen konnten nicht geladen werden!", // GET-Message to Snack
  postMessage: "Ämtli erstellt", // POST-Message to Snack
  putMessage: "Ämtli aktualisiert", // PUT-Message to Snack
  deleteMessage: "Ämtli gelöscht", // DELETE-Mesage to Snack
  mutateUrl: "/api/Chores/", // POST/PUT/DELETE-Url from Swagger UI
};

// GET - load all Rewards on Children-Dashboard
export const useChildRewardGet = (id: number) =>
  useGet<RewardWithGrants[]>(
    rewardProps.getKey,
    rewardProps.getUrl + id,
    rewardProps.getMessage
  );
