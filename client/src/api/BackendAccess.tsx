import axios, { AxiosRequestConfig, AxiosStatic } from "axios";
import { useMutation, useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AppState } from "../AppState";
import { LoadingData } from "./models/LoadingData";
import { QueryUrl } from "./models/QueryMethod";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

// GET function
export function GetDataQuery(url: QueryUrl, id?: number): LoadingData {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);

  let getId: string = "";

  if (id) {
    getId = "/" + id;
  }

  // console.log(apiBaseUrl + url + getId);

  const { isLoading, error, data: queryData } = useQuery("getData", () =>
    axios
      .get(`${apiBaseUrl}${url}${getId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((data) => data?.data)
  );
  // console.log(
  //   "Testbeginn = offen: " +
  //     queryState.open +
  //     " Variante: " +
  //     queryState.variant
  // );

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
  // console.log(
  //   "Testschluss = offen: " +
  //     queryState.open +
  //     " Variante: " +
  //     queryState.variant
  // );

  return { isLoading: isLoading, error: error, data: queryData ?? [] };
}
