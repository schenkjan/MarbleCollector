import axios from "axios";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import {
  useErrorNotification,
  useSuccessNotification,
} from "../shell/hooks/SnackbarHooks";
import { getApiBaseUrl } from "../parent/ParentBackendAccess";
import { QueryObject } from "./models/QueryObject";
import { QueryObjectUrl } from "./models/QueryObjectUrl";

const apiBaseUrl = getApiBaseUrl();

// GET
export function useGet<T>(
  key: string | [string, string | number | undefined],
  url: QueryObjectUrl,
  errorMessage: string,
  additiveUrl?: number | string
) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [queryState, setQueryState] = useRecoilState(AppState.queryStateInfo);
  const showError = useErrorNotification();

  const { isLoading, isFetching, isError, data } = useQuery<T>(
    key,
    () =>
      axios
        .get(`${apiBaseUrl}${url}${additiveUrl ? additiveUrl : ""}`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
        .then((data) => data.data),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if ((isLoading || isFetching) && queryState.open === false) {
      setQueryState({
        open: true,
      });
    } else if (isError) {
      setqueryState({
        open: false,
      });
      showError(errorMessage);
    } else if (
      !isLoading &&
      !isFetching &&
      !isError &&
      queryState.open === true
    ) {
      setQueryState({
        open: false,
      });
    }
  }, [isLoading, isFetching, isError, data]);
  return {
    data: data,
  };
}

// POST
export function usePost<T>(
  invalidateKey: string,
  successMessage: string,
  errorMessage: string
) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const showSuccess = useSuccessNotification();
  const showError = useErrorNotification();
  const mutate = useMutation(
    (object: QueryObject) =>
      axios.post(`${apiBaseUrl}${object.url}`, object.object, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(invalidateKey);
        showSuccess(successMessage);
      },
      onError: () => {
        queryClient.invalidateQueries(invalidateKey);
        showError(errorMessage);
      },
    }
  );

  return mutate;
}

// PUT
export function usePut<T>(
  invalidateKey: string,
  successMessage: string,
  errorMessage: string
) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const showSuccess = useSuccessNotification();
  const showError = useErrorNotification();
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
        showSuccess(successMessage);
      },
      onError: () => {
        queryClient.invalidateQueries(invalidateKey);
        showError(errorMessage);
      },
    }
  );

  return mutation;
}

// DELETE
export function useDelete<T>(
  invalidateKey: string,
  successMessage: string,
  errorMessage: string
) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const showSuccess = useSuccessNotification();
  const showError = useErrorNotification();
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
        showSuccess(successMessage);
      },
      onError: () => {
        queryClient.invalidateQueries(invalidateKey);
        showError(errorMessage);
      },
    }
  );

  return mutation;
}
