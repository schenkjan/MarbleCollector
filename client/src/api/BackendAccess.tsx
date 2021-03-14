import axios from "axios";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { LoadingData } from "./models/LoadingData";
import { QueryUrl } from "./models/QueryUrl";

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

// GET function
export function GetData(url: QueryUrl) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);

  const { isLoading, error, data } = useQuery("get", () =>
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

  return { isLoading: isLoading, error: error, data: data };
}

// Single-GET function
export function GetSingleData(url: QueryUrl, id: number) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);

  let addId: string = "/" + id;

  const { isLoading, error, data } = useQuery("singleGet", () =>
    axios
      .get(`${apiBaseUrl}${url}${addId}`, {
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

  return { isLoading: isLoading, error: error, data: data };
}

// POST function
export function PostData(url: QueryUrl, body: object) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);

  const { isLoading, error, data } = useQuery("post", () =>
    axios
      .post(`${apiBaseUrl}${url}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: body,
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

  return { isLoading: isLoading, error: error, data: data };
}

// PUT function
export function PutSingleData(url: QueryUrl, id: number, body: object) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);

  let addId: string = "/" + id;

  const { isLoading, error, data } = useQuery("singlePut", () =>
    axios
      .put(`${apiBaseUrl}${url}${addId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: body,
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

  return { isLoading: isLoading, error: error, data: data };
}

// DELETE function
export function DeleteSingleData(url: QueryUrl, id: number) {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);

  let addId: string = "/" + id;

  const { isLoading, error, data } = useQuery("singleDelete", () =>
    axios
      .delete(`${apiBaseUrl}${url}${addId}`, {
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

  return { isLoading: isLoading, error: error, data: data };
}
