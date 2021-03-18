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
import { useProfileCardStyles } from "./ProfileCardStyles";
import { Link } from "react-router-dom";
import { Family } from "../models/Family";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

type UserFamilyCardProps = {
  family: Family;
};

export function UserFamilyCard(props: UserFamilyCardProps) {
  const classes = useStyles();
  const profileCardStyles = useProfileCardStyles();
  const allFamilyMembers = [...props.family.parents, ...props.family.children];

  return (
    <>
      <Card className={profileCardStyles.card}>
        {/* <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      /> */}
        <CardContent>
          <List className={classes.root}>
            {allFamilyMembers.map((user) => {
              return (
                <>
                  <ListItem
                    alignItems="flex-start"
                    component={Link}
                    to={`${"/app/child/profile"}/${"name"}`}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Brunch this weekend?"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Ali Connors
                          </Typography>
                          {
                            " — I'll be in your neighborhood doing errands this…"
                          }
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
}
