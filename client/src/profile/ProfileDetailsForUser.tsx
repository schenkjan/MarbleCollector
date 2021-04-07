import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProfileGet } from "./ProfileBackendAccess";
import { UserFamilyCard } from "./UserFamilyCard";
import { UserProfileCard } from "./UserProfileCard";
import { UserScoreDetailsForUser } from "./UserScoreDetailsForUser";

type ProfileDetailsParams = {
  id: string;
};

export function ProfileDetailsForUser() {
  let { id } = useParams<ProfileDetailsParams>();

  let [data, invalidateQuery] = useProfileGet(id);

  useEffect(() => {
    invalidateQuery();
  }, [id]);

  return (
    <Box key={id}>
      <UserProfileCard user={data?.user} />
      <UserScoreDetailsForUser data={data} />
      <UserFamilyCard family={data?.family ?? []} />
    </Box>
  );
}
