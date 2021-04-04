import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProfileGet } from "../../profile/ProfileBackendAccess";
import { UserFamilyCard } from "../../profile/UserFamilyCard";
import { UserProfileCard } from "../../profile/UserProfileCard";
import { UserScoreDetailsForUser } from "../../profile/UserScoreDetailsForUser";

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
      <UserScoreDetailsForUser data={data} />
      <UserFamilyCard family={data?.family ?? []} />
    </Box>
  );
}
