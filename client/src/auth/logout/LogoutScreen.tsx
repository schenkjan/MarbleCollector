import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AppState } from "../../AppState";
import { AuthResponse } from "../login/models/AuthResponse";

/**
 * Logout Screen Best Practices
 * https://usabilitygeek.com/ux-logout-lapse/
 */
export function LogoutScreen() {
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(AppState.userInfoState);

  useEffect(() => {
    const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;
    const apiRestTestUrl = `${apiBaseUrl}/api/auth/logout`;
    const authResponse = userInfo as AuthResponse;
    if (authResponse != null) {
      setUsername(authResponse.username);
      axios
        .post(apiRestTestUrl, null, {
          headers: {
            Authorization: `Bearer ${authResponse.token}`,
          },
        })
        .then(() => {
          alert("Logout success");
          setUserInfo({});
        })
        .catch(() => {
          alert("Logout error");
        });
    }
  }, []);

  return (
    <>
      <p>Confirmation - You have successfully logged out!</p>
      <p>Acknowledgement - Thanks you {username} for using Marblecollector!</p>
      <p>Signposting - Want to log back in? Here you go!</p>
      <p>Engagement - Do you know that you do not have to logout? -- Here</p>
    </>
  );
}
