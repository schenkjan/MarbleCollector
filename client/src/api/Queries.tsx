import axios from "axios";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import {
  useErrorNotification,
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
  const [queryState, setQueryState] = useRecoilState(AppState.queryStateInfo);
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

  // if ((isLoading || isFetching) && queryState.open === false) {
  //   // TOOD js (25.03.2021): The setQueryState() seems to cause problems like "Cannot update a component (`Batcher`) while rendering a different component"
  //   // in the console output (see https://github.com/facebookexperimental/Recoil/issues/12#issuecomment-648620138 for an explanation).
  //   // Recoils seems to be working on a fix
  //   // Possible fix: https://github.com/facebookexperimental/Recoil/issues/12#issuecomment-732193801
  //   setQueryState({
  //     open: true,
  //   });
  // } else if (isError) {
  //   showError(errorMessage);
  // } else if (
  //   !isLoading &&
  //   !isFetching &&
  //   !isError &&
  //   queryState.open === true
  // ) {
  //   setQueryState({
  //     open: false,
  //   });
  // }

  useEffect(() => {
    if ((isLoading || isFetching) && queryState.open === false) {
      setQueryState({
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
      setQueryState({
        open: false,
      });
    }
  }, [
    errorMessage,
    isError,
    isFetching,
    isLoading,
    queryState.open,
    setQueryState,
    showError,
  ]);

  return {
    data: data,
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
  const showSuccess = useSuccessNotification();
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
        showSuccess(InfoMessage);
      },
    }
  );

  return mutation;
}

// DELETE
export function useDelete<T>(invalidateKey: string, infoMessage: string) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const queryClient = useQueryClient();
  const showSuccess = useSuccessNotification();
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
        showSuccess(infoMessage);
      },
    }
  );

  return mutation;
}
