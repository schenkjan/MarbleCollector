import React, { useEffect, useState } from "react";

import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AppState } from "../../AppState";
import { LogoutProgress } from "./LogoutProgress";
import { LogoutSuccess } from "./LogoutSuccess";

/**
 * Logout Screen Best Practices
 * https://usabilitygeek.com/ux-logout-lapse/
 */
export function LogoutScreen() {
  const secondsTillRedirect = 5;
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const userInfo = useRecoilValue(AppState.userInfo);
  const setUserInfo = useSetRecoilState(AppState.userInfoState);

  useEffect(() => {
    async function logout() {
      const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;
      const apiRestTestUrl = `${apiBaseUrl}/api/auth/logout`;
      if (userInfo != null) {
        try {
          setUsername(userInfo?.username);
          const logoutResponse = await axios.post(apiRestTestUrl, null, {
            headers: {
              Authorization: `Bearer ${userInfo?.token}`,
            },
          });
          // add global snackbar message

          setTimeout(() => {
            // ensure that the global state gets cleared, even if the component is unmounted
            setUserInfo({});
          }, secondsTillRedirect * 1000);
        } catch (error) {
          // todo replace with global snackbar
          alert("Logout error");
        } finally {
          setLoading(false);
        }
      }
    }

    logout();
  }, []);

  return (
    <>
      {loading && <LogoutProgress open={loading} />}
      {!loading && (
        <LogoutSuccess
          username={username}
          secondsTillRedirect={secondsTillRedirect}
        />
      )}
    </>
  );
}
