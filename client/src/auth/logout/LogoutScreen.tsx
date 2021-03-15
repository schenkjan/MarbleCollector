import React, { useEffect, useState } from "react";

import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AppState } from "../../AppState";
import { LogoutProgress } from "./LogoutProgress";
import { LogoutSuccess } from "./LogoutSuccess";
import {
  useSuccessNotification,
  useErrorNotification,
} from "../../shell/hooks/SnackbarHooks";
import { useHistory } from "react-router-dom";

/**
 * Logout Screen Best Practices
 * https://usabilitygeek.com/ux-logout-lapse/
 */
export function LogoutScreen() {
  const history = useHistory();
  const secondsTillRedirect = 5;
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const userInfo = useRecoilValue(AppState.userInfo);
  const setUserInfo = useSetRecoilState(AppState.userInfoState);
  const showSuccess = useSuccessNotification();
  const showError = useErrorNotification();

  useEffect(() => {
    async function logout() {
      const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;
      const apiRestTestUrl = `${apiBaseUrl}/api/auth/logout`;
      if (userInfo != null) {
        try {
          setUsername(userInfo?.username);
          await axios.post(apiRestTestUrl, null, {
            headers: {
              Authorization: `Bearer ${userInfo?.token}`,
            },
          });
          showSuccess("Erfolgreich ausgeloggt.");
          setTimeout(() => {
            // ensure that the global state gets cleared, even if the component is unmounted
            setUserInfo({});
            history.push("/");
          }, secondsTillRedirect * 1000);
        } catch (error) {
          showError(`Logout ist fehlgeschlagen: ${JSON.stringify(error)}`);
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
