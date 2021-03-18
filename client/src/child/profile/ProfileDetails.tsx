import React from "react";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { useProfileData } from "../BackendAccess";
import { UserFamilyCard } from "./UserFamilyCard";
import { UserProfileCard } from "./UserProfileCard";
import { UserScoreCard } from "./UserScoreCard";

export function ProfileDetails() {
  useDashboardTitle("Profil");

  const { isLoading, error, profile } = useProfileData();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <UserProfileCard user={profile} />
      <UserScoreCard />
      <UserFamilyCard family={{ children: [], parents: [] }} />
    </>
  );
}
