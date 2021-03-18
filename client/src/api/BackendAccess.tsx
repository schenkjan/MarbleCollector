import axios, { AxiosResponse } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { ChoreWithAssignments } from "../parent/models/ChoreWithAssignments";
import {
  useErrorNotification,
  useInfoNotification,
  useSuccessNotification,
} from "../shell/hooks/SnackbarHooks";
import { ChoreLoadingData } from "./models/ChoreLoadingData";
import { QueryObject } from "./models/QueryObject";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

// GET Parent Chores
export function useParentChoreData(): ChoreLoadingData {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);
  const showError = useErrorNotification();

  const { isLoading, isFetching, isError, data: chores } = useQuery(
    "parentChoreGet",
    () =>
      axios
        .get<ChoreWithAssignments[]>(`${apiBaseUrl}/api/Chores/Assignments/`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
        .then((data) => data?.data)
  );
  if ((isLoading || isFetching) && queryState.open === false) {
    setqueryState({
      open: true,
    });
  } else if (isError) {
    showError("losed Data!");
  } else if (
    !isLoading &&
    !isFetching &&
    !isError &&
    queryState.open === true
  ) {
    setqueryState({
      open: false,
    });
  }
  return {
    isLoading: isLoading,
    isFetching: isFetching,
    isError: isError,
    chores: chores ?? [],
  };
}

// POST
export function QueryPost(): UseMutationResult<
  AxiosResponse<QueryObject>,
  unknown,
  QueryObject,
  unknown
> {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const showSuccess = useSuccessNotification();
  const mutation = useMutation(
    (object: QueryObject) =>
      axios.post<QueryObject>(`${apiBaseUrl}${object.url}`, object.object, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("parentChoreGet");
        showSuccess("chore created");
      },
    }
  );

  return mutation;
}

// PUT
export function QueryPut(): UseMutationResult<
  AxiosResponse<QueryObject>,
  unknown,
  QueryObject,
  unknown
> {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const showInfo = useInfoNotification();
  const mutation = useMutation(
    (object: QueryObject) =>
      axios.put<QueryObject>(
        `${apiBaseUrl}${object.url + object.object.id}`,
        object.object,
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

// DELETE
export function QueryDelete(): UseMutationResult<
  AxiosResponse<QueryObject>,
  unknown,
  QueryObject,
  unknown
> {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const showInfo = useInfoNotification();
  const mutation = useMutation(
    (object: QueryObject) =>
      axios.delete<QueryObject>(
        `${apiBaseUrl}${object.url + object.object.id}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("parentChoreGet");
        showInfo("chore deleted");
      },
    }
  );

  return mutation;
}
