import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import {
  useErrorNotification,
  useInfoNotification,
  useSuccessNotification,
} from "../shell/hooks/SnackbarHooks";
import { QueryObject } from "./models/QueryObject";
import { QueryObjectUrl } from "./models/QueryObjectUrl";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

// GET
export function useGet<T>(
  key: string,
  url: QueryObjectUrl,
  errorMessage: string
) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);
  const showError = useErrorNotification();

  const { isLoading, isFetching, isError, data } = useQuery<T>(key, () =>
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
  return {
    chores: data,
  };
}

// POST
export function usePost<T>(invalidateKey: string, successMessage: string) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const showSuccess = useSuccessNotification();
  const mutation = useMutation(
    (object: QueryObject) =>
      axios.post<T>(`${apiBaseUrl}${object.url}`, object.object, {
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
export function usePut<T>(invalidateKey: string, InfoMessage: string) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const showInfo = useInfoNotification();
  const mutation = useMutation(
    (object: QueryObject) =>
      axios.put<T>(
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
export function useDelete<T>(invalidateKey: string, infoMessage: string) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const showInfo = useInfoNotification();
  const mutation = useMutation(
    (object: QueryObject) =>
      axios.delete<T>(`${apiBaseUrl}${object.url + object.object.id}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(invalidateKey);
        showInfo(infoMessage);
      },
    }
  );

  return mutation;
}
