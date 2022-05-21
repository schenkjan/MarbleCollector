import React, { useEffect, useState } from "react";

import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AppState } from "../../AppState";
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
  const [username, setUsername] = useState("");
  const userInfo = useRecoilValue(AppState.userInfo);
  const setUserInfo = useSetRecoilState(AppState.userInfoState);
  const [queryState, setQueryState] = useRecoilState(AppState.queryStateInfo);
  const showSuccess = useSuccessNotification();
  const showError = useErrorNotification();

  useEffect(() => {
    async function logout() {
      const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;
      const apiRestTestUrl = `${apiBaseUrl}/api/auth/logout`;
      if (userInfo != null) {
        setQueryState({
          open: true,
        });
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
          setQueryState({
            open: false,
          });
        }
      }
    }

    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!queryState.open && (
        <LogoutSuccess
          username={username}
          secondsTillRedirect={secondsTillRedirect}
        />
      )}
    </>
  );
}
