import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { useLocation } from "react-router-dom";

export function useDashboardBasePath() {
  const userRole = useRecoilValue(AppState.userRole);
  const [basePath, setBasePath] = useState<string>();
  const { pathname: path } = useLocation();

  useEffect(() => {
    let currentBasePath = `/`;
    if (userRole) {
      currentBasePath = `/app/${userRole.toLowerCase()}`;
    }

    setBasePath(currentBasePath);
  }, [userRole]);

  return basePath;
}
