import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProfileGet } from "../../profile/ProfileBackendAccess";
import { UserFamilyCard } from "../../profile/UserFamilyCard";
import { UserProfileCard } from "../../profile/UserProfileCard";
import { UserScoreCard } from "../../profile/UserScoreCard";

type ProfileDetailsParams = {
  id: string;
};

export function ProfileDetailsForUser() {
  let { id } = useParams<ProfileDetailsParams>();

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
