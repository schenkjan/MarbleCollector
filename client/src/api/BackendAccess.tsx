import { TableBody } from "@material-ui/core";
import axios, { AxiosRequestConfig, AxiosStatic } from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AppState } from "../AppState";
import { ChoreTableRow } from "../parent/ChoreTableRow";
import { LoadingData } from "./models/LoadingData";

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

export function GetQuery(url: string): LoadingData {
  const bearerToken = useRecoilValue(AppState.userBearerToken);

  // const queryState = useRecoilValue(AppState.queryStateInfo);
  // const setqueryState = useSetRecoilState(AppState.queryStateInfo);
  const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);

  let queryKey: string = "";

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

  // Change State of the PortalOverlay function show the request-state
  if (isLoading && queryState.open === false) {
    setqueryState({
      open: true,
      variant: "isLoading",
    });
  } else if (error && queryState.open === false) {
    setqueryState({
      open: true,
      variant: "error",
    });
  } else if (!isLoading && !error && queryState.open === true) {
    setqueryState({
      open: false,
      variant: "isLoading",
    });
  }
  return { isLoading: isLoading, error: error, data: queryData ?? [] };
}
