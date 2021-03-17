import axios from "axios";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AppState } from "../AppState";
import { ChoreWithAssignments } from "../parent/models/ChoreWithAssignments";
import { useErrorNotification } from "../shell/hooks/SnackbarHooks";
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
export const QueryPost = async (body: QueryObject) => {
  const { data } = await axios.post(
    `${apiBaseUrl}${body.variant}`,
    body.object,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );
  return data;
};

// DELETE
export const QueryDelete = async (body: QueryObject) => {
  const { data } = await axios.delete(
    `${apiBaseUrl}${body.variant + body.object.id}`,
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    }
  );
  return data;
};
