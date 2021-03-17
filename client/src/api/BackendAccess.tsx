import axios from "axios";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AppState } from "../AppState";
import { ChoreWithAssignments } from "../parent/models/ChoreWithAssignments";
import { ChoreLoadingData } from "./models/ChoreLoadingData";
import { QueryObject } from "./models/QueryObject";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

// GET Parent Chores
export function useParentChoreData(): ChoreLoadingData {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);
  const setSnackState = useSetRecoilState(AppState.snackState);

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
    setSnackState({
      open: true,
      message: "request failed",
      severity: "error",
    });
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

// POST Single Chore
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
