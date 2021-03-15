import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";

export function useDashboardBasePath() {
  const userRole = useRecoilValue(AppState.userRole);
  const [basePath, setBasePath] = useState<string>();

  useEffect(() => {
    let currentBasePath = `/`;
    if (userRole) {
      currentBasePath = `/app/${userRole.toLowerCase()}`;
    }

    setBasePath(currentBasePath);
  }, [userRole]);

  return basePath;
}
