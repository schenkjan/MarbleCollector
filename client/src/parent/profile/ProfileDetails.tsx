import React from "react";
import { useRecoilValue } from "recoil";
import { useProfileGet } from "../../api/BackendAccess";
import { AppState } from "../../AppState";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { UserFamilyCard } from "./UserFamilyCard";
import { UserProfileCard } from "./UserProfileCard";

export function ProfileDetails() {
  useDashboardTitle("Profil");

  const userId = useRecoilValue(AppState.userInfo);
  const { data } = useProfileGet(userId?.id);

  return (
    <>
      <UserProfileCard user={data?.user} />
      <UserFamilyCard family={data?.family ?? []} />
    </>
  );
}
