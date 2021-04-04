import React from "react";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProtectedRoutesController } from "./ProtectedRoutesController";

export function ProtectedArea() {
  return (
    <>
      <Switch>
        <ProtectedRoute routeProps={{ path: "/app" }}>
          <ProtectedRoutesController />
        </ProtectedRoute>
      </Switch>
    </>
  );
}
