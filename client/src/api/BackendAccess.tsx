import axios, { AxiosResponse } from "axios";
import { AnyNaptrRecord } from "dns";
import { UseMutateFunction, useMutation, useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AppState } from "../AppState";
import { ChoreWithAssignments } from "../parent/models/ChoreWithAssignments";
import { ChoreLoadingData } from "./models/ChoreLoadingData";
import { Chore } from "../parent/models/Chore";

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

// // GET Single Chore
// export const GetPost = async (key: any, obj: any) => {
//   const { data } = await axios.get(`http://localhost:5050/posts/${obj.id}`);
//   return data;
// };

interface test {
  token: string;
  object: any;
}

// POST Single Chore
export const UpdatePost = async (body: test) => {
  console.log(body);
  console.log(body.token);

  const { data } = await axios.post(`${apiBaseUrl}/api/Chores/`, {
    headers: {
      Authorization: `Bearer ${body.token}`,
    },
    body.object,
  });
  return data;
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InBldGVyIiwicm9sZSI6IlBhcmVudCIsIm5iZiI6MTYxNTkyNjgwMiwiZXhwIjoxNjE4NTE4ODAyLCJpYXQiOjE2MTU5MjY4MDIsImlzcyI6Ik1hcmJsZUNvbGxlY3RvckFwaS1ERVYiLCJhdWQiOiJNYXJibGVDb2xsZWN0b3JBcGktREVWLUNsaWVudHMifQ.pv_YXPgNwILlWsKEdMZVsad3gAORkst7Dc8h5bcXjek

// // POST Single Chore
// export const UpdatePost = async (addSingleChore: any) => {
//   const bearerToken = useRecoilValue(AppState.userBearerToken);
//   console.log("url: " + `${apiBaseUrl}/api/Chores/`);
//   console.log("token: " + `Bearer ${bearerToken}`);
//   console.log(addSingleChore);

//   const { data } = await axios.put(`${apiBaseUrl}/api/Chores/`, {
//     headers: {
//       Authorization: `Bearer ${bearerToken}`,
//     },
//     addSingleChore,
//   });
//   return data;
// };

////////////////////////////////////////////

// // POST Single Chore
// export const UpdatePost = async (body: any) => {
//   const addSingleChore = useRecoilValue(AppState.addChoreInfo);

//   const { data } = await axios.put(
//     `http://localhost:5050/posts/`,
//     addSingleChore
//   );
//   return data;
// };

// POST Single Chore
// export function UpdatePost(choreObject: any): any | unknown | void | unknown {
//   const bearerToken = useRecoilValue(AppState.userBearerToken);
//   const { mutate } = useMutation(() =>
//     axios.put(`http://localhost:5050/posts/`, choreObject)
//   );
//   return mutate;
// }

// POST Single Chore
// export function useSingleChorePost(
//   singleChore: object
// ): any | unknown | void | unknown {
//   const bearerToken = useRecoilValue(AppState.userBearerToken);
//   const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);
//   console.log(singleChore);

//   // const { mutate } = useMutation(() =>
//   axios.post(
//     `${apiBaseUrl}/api/Chores/`,
//     {
//       data: singleChore,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${bearerToken}`,
//       },
//     }
//   );
// console.log(mutate);
// return { mutate: mutate };

// GET function
// export function GetData(url: string, id?: number): LoadingData {
//   const bearerToken = useRecoilValue(AppState.userBearerToken);
//   const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);

//   const { isLoading, error, data } = useQuery("get", () =>
//     axios
//       .get(`${apiBaseUrl}${url}${id ? id : ""}`, {
//         headers: {
//           Authorization: `Bearer ${bearerToken}`,
//         },
//       })
//       .then((data) => data?.data)
//   );
//   console.log("passed get!");
//   // Change State of the PortalOverlay function show the request-state
//   if (isLoading && queryState.open === false) {
//     setqueryState({
//       open: true,
//       variant: "isLoading",
//     });
//   } else if (error && queryState.open === false) {
//     setqueryState({
//       open: true,
//       variant: "error",
//     });
//   } else if (!isLoading && !error && queryState.open === true) {
//     setqueryState({
//       open: false,
//       variant: "isLoading",
//     });
//   }

//   return { isLoading: isLoading, error: error, data: data };
// }

// // Single-GET function
// export function GetSingleData(url: QueryUrl, id: number) {
//   const bearerToken = useRecoilValue(AppState.userBearerToken);
//   const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);

//   let addId: string = id;

//   const { isLoading, error, data } = useQuery("singleGet", () =>
//     axios
//       .get(`${apiBaseUrl}${url}${addId}`, {
//         headers: {
//           Authorization: `Bearer ${bearerToken}`,
//         },
//       })
//       .then((data) => data?.data)
//   );
//   console.log("passed singleGet!");
//   // Change State of the PortalOverlay function show the request-state
//   if (isLoading && queryState.open === false) {
//     setqueryState({
//       open: true,
//       variant: "isLoading",
//     });
//   } else if (error && queryState.open === false) {
//     setqueryState({
//       open: true,
//       variant: "error",
//     });
//   } else if (!isLoading && !error && queryState.open === true) {
//     setqueryState({
//       open: false,
//       variant: "isLoading",
//     });
//   }

//   return { isLoading: isLoading, error: error, data: data };
// }

// // POST function
// export function PostData(url: QueryUrl, body: object) {
//   const bearerToken = useRecoilValue(AppState.userBearerToken);
//   const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);

//   const { isLoading, error, data } = useQuery("post", () =>
//     axios
//       .post(`${apiBaseUrl}${url}`, {
//         headers: {
//           Authorization: `Bearer ${bearerToken}`,
//         },
//         body: body,
//       })
//       .then((data) => data?.data)
//   );
//   console.log("passed post!");
//   // Change State of the PortalOverlay function show the request-state
//   if (isLoading && queryState.open === false) {
//     setqueryState({
//       open: true,
//       variant: "isLoading",
//     });
//   } else if (error && queryState.open === false) {
//     setqueryState({
//       open: true,
//       variant: "error",
//     });
//   } else if (!isLoading && !error && queryState.open === true) {
//     setqueryState({
//       open: false,
//       variant: "isLoading",
//     });
//   }

//   return { isLoading: isLoading, error: error, data: data };
// }

// // PUT function
// export function PutSingleData(url: QueryUrl, id: number, body: object) {
//   const bearerToken = useRecoilValue(AppState.userBearerToken);
//   const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);

//   let addId: string = id;

//   const { isLoading, error, data } = useQuery("singlePut", () =>
//     axios
//       .put(`${apiBaseUrl}${url}${addId}`, {
//         headers: {
//           Authorization: `Bearer ${bearerToken}`,
//         },
//         body: body,
//       })
//       .then((data) => data?.data)
//   );
//   console.log("passed singlePut!");
//   // Change State of the PortalOverlay function show the request-state
//   if (isLoading && queryState.open === false) {
//     setqueryState({
//       open: true,
//       variant: "isLoading",
//     });
//   } else if (error && queryState.open === false) {
//     setqueryState({
//       open: true,
//       variant: "error",
//     });
//   } else if (!isLoading && !error && queryState.open === true) {
//     setqueryState({
//       open: false,
//       variant: "isLoading",
//     });
//   }

//   return { isLoading: isLoading, error: error, data: data };
// }

// DELETE function
// export function DeleteSingleData(url: string, id?: number) {
//   const bearerToken = useRecoilValue(AppState.userBearerToken);
//   // const [queryState, setqueryState] = useRecoilState(AppState.queryStateInfo);

//   const { mutate } = useMutation("singleDelete", () =>
//     axios
//       .delete(`${apiBaseUrl}${url}${id ? id : ""}`, {
//         headers: {
//           Authorization: `Bearer ${bearerToken}`,
//         },
//       })
//       .then((data) => console.log(data?.data))
//   );
//   console.log("passed delete!");
// Change State of the PortalOverlay function show the request-state
// if (isLoading && queryState.open === false) {
//   setqueryState({
//     open: true,
//     variant: "isLoading",
//   });
// } else if (error && queryState.open === false) {
//   setqueryState({
//     open: true,
//     variant: "error",
//   });
// } else if (!isLoading && !error && queryState.open === true) {
//   setqueryState({
//     open: false,
//     variant: "isLoading",
//   });
// }

// return { isLoading: isLoading, error: error, data: data };
// }
