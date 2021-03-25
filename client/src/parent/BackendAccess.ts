import axios, { AxiosResponse } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "react-query";
import { useRecoilValue } from "recoil";
import { AppState, useFamilyMembership } from "../AppState";
import { Assignment } from "./models/Assignment";
import { AssignmentForCreate } from "./models/AssignmentForCreate";
import { ChoreWithAssignments } from "./models/ChoreWithAssignments";
import { GrantForCreate } from "./models/GrantForCreate";
import { User } from "./models/User";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

interface ChoreLoadingData {
  isLoading: boolean;
  error: unknown;
  chores: ChoreWithAssignments[];
}

// TODO js (25.03.2021): Move to generic backend access file.
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
        queryClient.invalidateQueries("parentChoreGet");
      },
    }
  );

  return mutation;
}

export function useAddGrant(): UseMutationResult<
  AxiosResponse<GrantForCreate>,
  unknown,
  GrantForCreate,
  unknown
> {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (assignment: GrantForCreate) =>
      axios.post<GrantForCreate>(`${apiBaseUrl}/api/Grants`, assignment, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("parentRewardGet");
      },
    }
  );

  return mutation;
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
