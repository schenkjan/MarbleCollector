import React, { useState } from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { getRoleName, User } from "../../parent/models/User";
import { CardActions, Collapse, Grid, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  getUsernameUppercase,
  useProfileCardStyles,
} from "../../profile/ProfileCardStyles";
import { DarkModeSwitch } from "../../shell/navigation/DarkModeSwitch";
import { LikeButton } from "../../shell/navigation/LikeButton";
import { NotificationApprovalButton } from "../../notifications/NotificationApprovalButton";

const useStyles = makeStyles(({ transitions, spacing, palette }) => ({
  avatar: {
    width: spacing(16),
    height: spacing(16),
    margin: "auto",
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    margin: 0,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: "1px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: transitions.create("transform", {
      duration: transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

type UserProfileCardProps = {
  user: User | undefined;
};

export function UserProfileCard(props: UserProfileCardProps) {
  const { user } = props;
  const styles = useStyles();
  const profileCardStyles = useProfileCardStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card className={cx(profileCardStyles.card)}>
        <CardContent style={{ paddingBottom: 0 }}>
          <Grid
            container
            justify="center"
            spacing={0}
            direction="row"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Avatar className={styles.avatar} src={user?.avatar} />
            </Grid>
            <Grid item xs={6}>
              <h3 className={profileCardStyles.heading}>
                {getUsernameUppercase(user?.username ?? "")}
              </h3>
              <span className={profileCardStyles.subheader}>
                {user?.family}
              </span>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <LikeButton />
          <IconButton aria-label="dark mode switch">
            <DarkModeSwitch />
          </IconButton>
          <NotificationApprovalButton />
          <IconButton
            className={cx(styles.expand, {
              [styles.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Box p={2} flex={"auto"}>
                <p className={styles.statLabel}>Email</p>
                <p className={styles.statValue}>{user?.email}</p>
              </Box>
              <Box p={2} flex={"auto"}>
                <p className={styles.statLabel}>Rolle</p>
                <p className={styles.statValue}>{getRoleName(user)}</p>
              </Box>
              <Box p={2} flex={"auto"}>
                <p className={styles.statLabel}>User-Id</p>
                <p className={styles.statValue}>{user?.id}</p>
              </Box>
              <Box p={2} flex={"auto"}>
                <p className={styles.statLabel}>Profile Prop 2</p>
                <p className={styles.statValue}>abc</p>
              </Box>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
