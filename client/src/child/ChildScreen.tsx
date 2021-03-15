import React from "react";
import { ProtectedRouteForRole } from "../auth/ProtectedRouteForRole";
import PortalOverlay from "../shell/PortalOverlay";
import { FiguresOverview } from "./FiguresOverview";

export function ChildScreen() {
  return (
    <>
      <ProtectedRouteForRole />
      <FiguresOverview></FiguresOverview>
      <PortalOverlay />
    </>
  );
}
