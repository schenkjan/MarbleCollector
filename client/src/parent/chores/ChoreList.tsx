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
import { useState } from "react";
import { ChoreCard } from "./ChoreCard";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { useParentChoreGet, useParentChorePost } from "../../api/BackendAccess";
import { ChoreWithAssignments } from "../models/ChoreWithAssignments";
import { useChildrenDataForUser } from "../BackendAccess";
import { useNotificationSubscription } from "../../notifications/NotificationHooks";

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
  // const notificationSubscription = useNotificationSubscription({
  //   subscriberKey: "choreList",
  //   notificationMethodName: "ReceiveMessage",
  //   notificationReceivedCallback: receiveMessag,
  // });
  const {
    isLoading: isChildrenLoading,
    error: childrenError,
    children,
  } = useChildrenDataForUser();

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
