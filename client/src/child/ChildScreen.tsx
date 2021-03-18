import React from "react";
import { ProtectedRouteForRole } from "../auth/ProtectedRouteForRole";
import { ChildChoreList } from "./chores/ChildChoreList";
import PortalOverlay from "../shell/PortalOverlay";

export function ChildScreen() {
  return (
    <>
      <ProtectedRouteForRole />
      <ChildChoreList />
      <PortalOverlay />
    </>
  );
}
