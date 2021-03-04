import axios from "axios";
import { useRecoilValue } from "recoil";
import { userBearerToken } from "../AppState";

const API_URL = process.env.REACT_APP_APIBASEURL as string;

export async function loadChores() {
  const apiAccessToken = ""; // useRecoilValue(userBearerToken); TODO not implemented as hook

  //Todo: Implement axios with async await...
  return axios.get(API_URL + "/Chores", {
    headers: {
      Authorization: `Bearer ${apiAccessToken}`,
    },
  });
}
