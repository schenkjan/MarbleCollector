import { TableBody } from "@material-ui/core";
import axios, { AxiosRequestConfig, AxiosStatic } from "axios";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AppState } from "../AppState";
import { ChoreTableRow } from "../parent/ChoreTableRow";
import { ChoreWithAssignments } from "../parent/models/ChoreWithAssignments";
import { doError } from "./ErrorData";
import { doLoading } from "./LoadingData";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

// Severin -->
export async function loadChores() {
  const apiAccessToken = ""; // useRecoilValue(AppState.userBearerToken); TODO not implemented as hook

  //Todo: Implement axios with async await...
  return axios.get(apiBaseUrl + "/Chores", {
    headers: {
      Authorization: `Bearer ${apiAccessToken}`,
    },
  });
}

export function GetQuery(url: string) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);

  // const setqueryState = useSetRecoilState(AppState.queryState);
  const [queryCondition, setqueryState] = useRecoilState(AppState.queryState);

  let queryKey: string = "";

  console.log(url);

  if (url === "/api/Chores/Assignments") {
    queryKey = "choreData";
  } else if (url === "api/Rewards") {
    queryKey = "rewardData";
  }

  const { isLoading, error, data: queryData } = useQuery(queryKey, () =>
    axios
      .get(`${apiBaseUrl}${url}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((data) => data?.data)
  );
  if (isLoading && queryCondition !== "loading") {
    setqueryState("loading");
  } else if (error && queryCondition !== "error") {
    setqueryState("error");
  } else if (!isLoading && !error && queryCondition !== "ready") {
    setqueryState("ready");
  }

  return queryData;
}
