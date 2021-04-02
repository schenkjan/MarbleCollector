import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Route } from "react-router";
import { Redirect, Switch, useParams, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { UserProfile } from "../../profile/models/UserProfile";
import { useProfileGet } from "../../profile/ProfileBackendAccess";
import { UserFamilyCard } from "../../profile/UserFamilyCard";
import { UserProfileCard } from "../../profile/UserProfileCard";
import { UserScoreCard } from "../../profile/UserScoreCard";

type ProfileDetailsParams = {
  id: string;
};

export function ProfileDetailsForUser() {
  let { id } = useParams<ProfileDetailsParams>();

  // function presentUserId: UserProfile(id: string) => {
  //   let { data } = useProfileGet(id);
  // }

  // let { data } = useProfileGet(id);

  // useEffect(() => {

  // });

  // let { data } = useProfileGet();

  // let data: UserProfile;

  // useEffect(() => {
  //   { data } useProfileGet(id);
  // }, [id]);

  // let { data } = useProfileGet(id)
  // let data: UserProfile;

  // const userInfo = useRecoilValue(AppState.userInfo);

  let [data, invalidateQuery] = useProfileGet(id);

  // const [actData, setActData] = useState(data);

  useEffect(() => {
    invalidateQuery();
  }, [id]);

  return (
    <Box key={id}>
      <UserProfileCard user={data?.user} />
      <UserScoreCard userScore={data?.score} />
      <UserFamilyCard family={data?.family ?? []} />
    </Box>
  );
}
