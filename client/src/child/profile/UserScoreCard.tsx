import React, { useState } from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import { useProfileCardStyles } from "./ProfileCardStyles";
import ImgMarbles from "../../images/Marble.png";
import ImgChores from "../../images/Chores.png";
import ImgRewards from "../../images/Rewards.png";

import { UserScoreCardItem } from "./UserScoreCardItem";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import RedeemIcon from "@material-ui/icons/Redeem";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

export function UserScoreCard() {
  const styles = useProfileCardStyles();
  const [marbles, setMarbles] = useState(0);
  const [chores, setChores] = useState(0);
  const [rewards, setRewards] = useState(0);

  return (
    <>
      <Card className={styles.card}>
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <UserScoreCardItem
                ammount={marbles}
                icon={<TrendingUpIcon fontSize="large" />}
                text="Familienranking"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <UserScoreCardItem
                ammount={marbles}
                picture={ImgMarbles}
                imgDescription="marble"
                text="Kontostand Murmeln"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <UserScoreCardItem
                ammount={chores}
                icon={<AssignmentIcon fontSize="large" />}
                text="Erledigte Ämtli"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <UserScoreCardItem
                ammount={rewards}
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
