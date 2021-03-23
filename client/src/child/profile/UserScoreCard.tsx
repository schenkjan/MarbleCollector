import React from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import { useProfileCardStyles } from "./ProfileCardStyles";
import ImgMarbles from "../../images/Marble.png";

import { UserScoreCardItem } from "./UserScoreCardItem";
import AssignmentIcon from "@material-ui/icons/Assignment";
import RedeemIcon from "@material-ui/icons/Redeem";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { UserScore } from "../models/UserScore";

type UserScoreCardProps = {
  userScore: UserScore | undefined;
};

export function UserScoreCard(props: UserScoreCardProps) {
  const styles = useProfileCardStyles();
  const { userScore } = props;
  return (
    <>
      <Card className={styles.card}>
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <UserScoreCardItem
                ammount={userScore?.familyRank ?? 0}
                icon={<TrendingUpIcon fontSize="large" />}
                text="Familienranking"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <UserScoreCardItem
                ammount={userScore?.marbleBalance ?? 0}
                picture={ImgMarbles}
                imgDescription="marble"
                text="Kontostand Murmeln"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <UserScoreCardItem
                ammount={userScore?.choreAssignmentsCompleted ?? 0}
                icon={<AssignmentIcon fontSize="large" />}
                text="Erledigte Ämtli"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <UserScoreCardItem
                ammount={userScore?.rewardsGrantsCompleted ?? 0}
                icon={<RedeemIcon fontSize="large" />}
                text="Verdiente Belohnungen"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
