import axios from "axios";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";

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

// Jan -->
// export function LoadChoreAssignments() {
//   const bearerToken = useRecoilValue(AppState.userBearerToken);

//   const { isLoading, error, data: chores } = useQuery("parentChoreData", () =>
//     axios
//       .get<ChoreWithAssignments[]>(`${apiBaseUrl}/api/Chores/Assignments`, {
//         headers: {
//           Authorization: `Bearer ${bearerToken}`,
//         },
//       })
//       .then((data) => data?.data)
//   );
// }
