import {
  Box,
  Container,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  List,
} from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { ChoreItem } from "./ChoreItem";
import React, { useEffect } from "react";
import { ConfettiProps } from "../types/ConfettiProps";
import { useMyNotificationsByNamePrefixWithHandle } from "../../notifications/NotificationHooks";
import { NotificationNames } from "../../notifications/NotificationNames";
import { useChildChoreLoader } from "../ChildBackendAccess";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      flex: "1 1 auto",
      padding: "1px",
    },
    container: {
      padding: "0px",
    },
  })
);

//some default values...
let confettiProps: ConfettiProps = {
  size: {
    width: 414,
    height: 918,
  },
};

let surroundingElementRef: any = React.createRef();

export function ChildChoreList(): JSX.Element {
  const userId = useRecoilValue(AppState.userId);
  const [chores, invalidateChores] = useChildChoreLoader(userId);
  const classes = useStyles();
  useDashboardTitle("Ämtli");

  useEffect(() => {
    confettiProps.size.width = surroundingElementRef.current.offsetWidth - 1; // 210227 hs -1 quickfix to prevent horizontal slidebar after Confetti Rain
    confettiProps.size.height = surroundingElementRef.current.offsetHeight;
  });

  const [
    newChoreNotifications,
    setChoreNotificationsHandled,
  ] = useMyNotificationsByNamePrefixWithHandle(
    NotificationNames.prefix.assignment
  );

  useEffect(() => {
    if (newChoreNotifications.length > 0) {
      for (const notification of newChoreNotifications) {
        console.log(
          "Triggering reload for entity with id",
          notification.targetEntityId
        );
      }
      invalidateChores();
      setChoreNotificationsHandled(newChoreNotifications);
    }
  }, [invalidateChores, newChoreNotifications, setChoreNotificationsHandled]);

  useEffect(() => {
    confettiProps.size.width = surroundingElementRef.current.offsetWidth - 1; // 210227 hs -1 quickfix to prevent horizontal slidebar after Confetti Rain
    confettiProps.size.height = surroundingElementRef.current.offsetHeight;
  });

  return (
    <Container maxWidth="md" className={classes.container}>
      <div ref={surroundingElementRef}>
        <Box className={classes.box} component={Paper}>
          <List>
            {chores?.map((chore) => (
              <ChoreItem key={chore.id} chore={chore} size={confettiProps} />
            ))}
          </List>
        </Box>
      </div>
    </Container>
  );
}
