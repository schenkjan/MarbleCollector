import axios, { AxiosResponse } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "react-query";
import { useRecoilValue } from "recoil";
import { AppState, useFamilyMembership } from "../AppState";
import { AssignmentForCreate } from "./models/AssignmentForCreate";
import { ChoreWithAssignments } from "./models/ChoreWithAssignments";
import { RewardWithGrants } from "./models/RewardWithGrants";
import { User } from "./models/User";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

interface ChoreLoadingData {
  isLoading: boolean;
  error: unknown;
  chores: ChoreWithAssignments[];
}

export function useParentChoreData(): ChoreLoadingData {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const { isLoading, error, data: chores } = useQuery("parentChoreData", () =>
    axios
      .get<ChoreWithAssignments[]>(`${apiBaseUrl}/api/Chores/Assignments`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((data) => data?.data)
  );

  return { isLoading: isLoading, error: error, chores: chores ?? [] };
}

export function useAddAssignment(): UseMutationResult<
  AxiosResponse<AssignmentForCreate>,
  unknown,
  AssignmentForCreate,
  unknown
> {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (assignment: AssignmentForCreate) =>
      axios.post<AssignmentForCreate>(
        `${apiBaseUrl}/api/Assignments`,
        assignment,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("parentChoreData");
      },
    }
  );

  return mutation;
}

export function useDeleteAssignment(): UseMutationResult<
  AxiosResponse<number>,
  unknown,
  number,
  unknown
> {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (id: number) =>
      axios.delete<number>(`${apiBaseUrl}/api/Assignments/${id}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("parentChoreData");
      },
    }
  );

  return mutation;
}

interface RewardLoadingData {
  isLoading: boolean;
  error: unknown;
  rewards: RewardWithGrants[];
}

export function useParentRewardData(): RewardLoadingData {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const { isLoading, error, data: rewards } = useQuery("parentRewardData", () =>
    axios
      .get<RewardWithGrants[]>(`${apiBaseUrl}/api/Rewards/Grants`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((data) => data?.data)
  );

  return { isLoading: isLoading, error: error, rewards: rewards ?? [] };
}

interface ChildrenLoadingData {
  isLoading: boolean;
  error: unknown;
  children: User[];
}

export function useChildrenData(family: string): ChildrenLoadingData {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const { isLoading, error, data: children } = useQuery("parentChildData", () =>
    axios
      .get<User[]>(`${apiBaseUrl}/api/Users/Families/${family}?role=Child`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((data) => data?.data)
  );

  return { isLoading: isLoading, error: error, children: children ?? [] };
}

export function useChildrenDataForUser(): ChildrenLoadingData {
  const family = useFamilyMembership();

  return useChildrenData(family);
}
