import { useState } from "react";
import { DashboardLayout } from "../shell/DashboardLayout";
import { ChoreTable } from "./ChoreTable";

export function ParentScreen() {
  const [title, ] = useState("Ämtli Pinwand"); // TODO js (25.02.2021): Set title depending on state of the app.
  const [avatarAlt, ] = useState("Mami"); // TODO js (25.02.2021): Set the avatar alt value depending on logged in user.
  const [avatarSrc, ] = useState(""); // TODO js (25.02.2021): Set the avatar src depending on logged in user.

  return (
    <DashboardLayout avatarAlt={avatarAlt} avatarSrc={avatarSrc} title={title}>
      <ChoreTable/>
    </DashboardLayout>
  );
}
