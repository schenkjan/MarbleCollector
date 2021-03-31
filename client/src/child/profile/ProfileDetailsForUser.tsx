import React from "react";
import { Route } from "react-router";
import { Redirect, Switch, useParams, useRouteMatch } from "react-router-dom";
import { useProfileGet } from "../../profile/ProfileBackendAccess";
import { UserFamilyCard } from "../../profile/UserFamilyCard";
import { UserProfileCard } from "../../profile/UserProfileCard";
import { UserScoreCard } from "../../profile/UserScoreCard";

type ProfileDetailsParams = {
  id: string;
};

export function ProfileDetailsForUser() {
  let { id } = useParams<ProfileDetailsParams>();

  const { data } = useProfileGet(id);

  return (
    <>
      <span>Loading profile for user with {id}</span>
      <UserProfileCard user={data?.user} />
      <UserScoreCard userScore={data?.score} />
      <UserFamilyCard family={data?.family ?? []} />
    </>
  );
}
