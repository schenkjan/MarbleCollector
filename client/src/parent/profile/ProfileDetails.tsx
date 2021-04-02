import React from "react";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { useProfileGet } from "../../profile/ProfileBackendAccess";
import { UserFamilyCard } from "../../profile/UserFamilyCard";
import { UserProfileCard } from "../../profile/UserProfileCard";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";

export function ProfileDetails() {
  useDashboardTitle("Profil");

  const userId = useRecoilValue(AppState.userInfo);
  const [data] = useProfileGet(userId?.id);

  return (
    <>
      <UserProfileCard user={data?.user} />
      <UserFamilyCard family={data?.family ?? []} />
    </>
  );
}
