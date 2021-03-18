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
import { queryUrl } from "./models/QueryObjectUrl";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

// GET
// export function QueryGet<T>(key: string, url: queryUrl): T {

export function useGet<T>(
  key: string,
  url: queryUrl,
  errorMessage: string
): ChoreLoadingData {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);
  const showError = useErrorNotification();

  const { isLoading, isFetching, isError, data } = useQuery(key, () =>
    axios
      .get(`${apiBaseUrl}${url}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((data) => data.data)
  );
  if ((isLoading || isFetching) && queryState.open === false) {
    setqueryState({
      open: true,
    });
  } else if (isError) {
    showError(errorMessage);
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
  // return {};
  return {
    isLoading: isLoading,
    isFetching: isFetching,
    isError: isError,
    data: data,
  };
}

// POST
export function usePost(
  invalidateKey: string,
  successMessage: string
): UseMutationResult<
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
        queryClient.invalidateQueries(invalidateKey);
        showSuccess(successMessage);
      },
    }
  );

  return mutation;
}

// PUT
export function usePut(
  invalidateKey: string,
  InfoMessage: string
): UseMutationResult<
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
        queryClient.invalidateQueries(invalidateKey);
        showInfo(InfoMessage);
      },
    }
  );

  return mutation;
}

// DELETE
export function useDelete(
  invalidateKey: string,
  infoMessage: string
): UseMutationResult<
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
        queryClient.invalidateQueries(invalidateKey);
        showInfo(infoMessage);
      },
    }
  );

  return mutation;
}
