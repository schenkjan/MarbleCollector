import { useState } from "react";
import { DashboardLayout } from "../shell/DashboardLayout";

export function ChildScreen() {
  const [title, ] = useState("Ämtli Pinwand");

  return (
    <DashboardLayout avatarAlt="Lio" avatarSrc="" title={title}>
      <p>Child Screen</p>
    </DashboardLayout>
  );
}
