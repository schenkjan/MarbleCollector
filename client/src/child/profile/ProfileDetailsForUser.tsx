import React, { useEffect, useState } from "react";
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

  console.log(id);

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
  // const changeProfileInfos = (id: string) => {
  //   return useProfileGet(id);
  // };

  let { data } = useProfileGet(id);
  // let { data } = changeProfileInfos(id);

  // const initData: UserProfile {
  //   data = {
  //     user = {},
  //     family = [],
  //     score = {},
  //   }
  // }

  // const initData: UserProfile;

  const [actData, setActData] = useState(data);

  useEffect(() => {
    setActData(data);
    console.log("changed!!!");
  }, [id]);

  console.log(actData?.user.id);

  return (
    <>
      <span>Loading profile for user with {id}</span>
      <UserProfileCard user={actData?.user} />
      <UserScoreCard userScore={actData?.score} />
      <UserFamilyCard family={actData?.family ?? []} />
    </>
  );
}
