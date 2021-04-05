import React from "react";
import { UserProfile } from "./models/UserProfile";
import { UserScoreCard } from "./UserScoreCard";

type UserScoreDetailsProps = {
  data: UserProfile | undefined;
};

export function UserScoreDetailsForUser(props: UserScoreDetailsProps) {
  const role = props.data?.user.role;

  return (
    <>
      {role === "Child" ? (
        <UserScoreCard userScore={props.data?.score} />
      ) : (
        <></>
      )}
    </>
  );
}
