import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  useProfileCardStyles,
  getUsernameUppercase,
} from "./ProfileCardStyles";
import { Link } from "react-router-dom";
import { User } from "../parent/models/User";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {},
  userName: {
    fontWeight: "bold",
  },
  userRole: { display: "inline" },
}));

type UserFamilyCardProps = {
  family: User[];
};

export function UserFamilyCard(props: UserFamilyCardProps) {
  const { family } = props;
  const classes = useStyles();
  const profileCardStyles = useProfileCardStyles();

  return (
    <>
      <Card className={profileCardStyles.card}>
        <CardContent>
          <List className={classes.root}>
            {family.map((user: User) => {
              return (
                <div key={user.id}>
                  <ListItem
                    alignItems="flex-start"
                    component={Link}
                    to={`/app/child/profile/${user.id}`}
                  >
                    <ListItemAvatar>
                      <Avatar alt={user.username} src={user.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                            className={classes.userName}
                          >
                            {getUsernameUppercase(user.username)}
                          </Typography>
                        </>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.userRole}
                            color="textSecondary"
                          >
                            {user.role}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
}
