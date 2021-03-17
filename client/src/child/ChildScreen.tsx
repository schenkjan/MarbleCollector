import React from "react";
import { ProtectedRouteForRole } from "../auth/ProtectedRouteForRole";
import { ChildChoreList } from "./chores/ChildChoreList";

export function ChildScreen() {
  return (
    <>
      <ProtectedRouteForRole />
      <ChildChoreList></ChildChoreList>
    </>
  );
}
