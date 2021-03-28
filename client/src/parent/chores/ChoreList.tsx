import {
  Box,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  List,
} from "@material-ui/core";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AddChoreDialog } from "./AddChoreDialog";
import { useEffect, useState } from "react";
import { ChoreCard } from "./ChoreCard";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { useParentChoreGet, useParentChorePost } from "../../api/BackendAccess";
import { ChoreWithAssignments } from "../models/ChoreWithAssignments";
import { useChildrenDataForUser } from "../BackendAccess";
import { useMyNotificationsByNamePrefixWithHandle } from "../../notifications/NotificationHooks";
import { NotificationNames } from "../../notifications/NotificationNames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flex: "1 1 auto",
      padding: "1px",
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(6),
      right: theme.spacing(2),
    },
  })
);

export function ChoreList(): JSX.Element {
  useDashboardTitle("Ämtli Pinnwand");
  const classes = useStyles();

  const [showDialog, setShowDialog] = useState(false);

  const { chores } = useParentChoreGet();
  const addChore = useParentChorePost();

  const {
    isLoading: isChildrenLoading,
    error: childrenError,
    children,
  } = useChildrenDataForUser();

  const [
    newChoreNotifications,
    setChoreNotificationsHandled,
  ] = useMyNotificationsByNamePrefixWithHandle(
    NotificationNames.prefix.assignment
  );

  useEffect(() => {
    if (newChoreNotifications.length > 0) {
      // TODO js (27.03.2021): How to trigger reload of single assignment/chore?
      for (const notification of newChoreNotifications) {
        console.log(
          "Triggering reload for entity with id",
          notification.targetEntityId
        );
      }
      setChoreNotificationsHandled(newChoreNotifications);
    }
  }, [newChoreNotifications, setChoreNotificationsHandled]);

  function receiveMessag(...args: any[]) {
    console.log(args);
  }

  function handleOnCancel() {
    setShowDialog(false);
  }

  function handleOnSave(choreObject: ChoreWithAssignments) {
    addChore.mutate({
      url: "/api/Chores/",
      object: choreObject,
    });
    setShowDialog(false);
  }

  function handleAddChore() {
    setShowDialog(true);
  }

  return (
    <Box className={classes.container} component={Paper}>
      <List>
        {chores?.map((chore) => (
          <ChoreCard key={chore.id} chore={chore} children={children} />
        ))}
      </List>
      <Fab
        className={classes.fab}
        size="small"
        color="primary"
        aria-label="add"
        onClick={handleAddChore}
      >
        <AddIcon />
      </Fab>
      <AddChoreDialog
        open={showDialog}
        onCancel={handleOnCancel}
        onSave={handleOnSave}
      />
    </Box>
  );
}
