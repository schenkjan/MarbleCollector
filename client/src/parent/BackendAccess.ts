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
import { ChoreWithAssignments } from "./models/ChoreWithAssignments";
import { User } from "./models/User";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

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

// TODO js (25.03.2021): Move to generic backend access file.
export function useChildrenDataForUser(): ChildrenLoadingData {
  const family = useFamilyMembership();

  return useChildrenData(family);
}

interface ChoreLoadingData {
  isLoading: boolean;
  error: unknown;
  chores: ChoreWithAssignments[];
}

// TODO js (25.03.2021): Remove as soon as the function is not used anymore in the children dashboard.
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

// TODO js (25.03.2021): Remove as soon as the function is not used anymore in the children dashboard.
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
