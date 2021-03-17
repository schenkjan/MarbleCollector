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
import { useParentChoreData, QueryPost } from "../../api/BackendAccess";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { useMutation, useQuery } from "react-query";
import { ChoreWithAssignments } from "../models/ChoreWithAssignments";
import { useInfoNotification } from "../../shell/hooks/SnackbarHooks";

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

  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [showDialog, setShowDialog] = useState(false);
  const showInfo = useInfoNotification();

  const { chores } = useParentChoreData();

  const { mutate } = useMutation(QueryPost);

  function handleOnCancel() {
    setShowDialog(false);
  }

  function handleOnSave(choreObject: ChoreWithAssignments) {
    mutate({
      variant: "/api/Chores/",
      object: choreObject,
      token: bearerToken,
    });
    showInfo("chore created");
    setShowDialog(false);
  }

  function handleAddChore() {
    setShowDialog(true);
  }

  return (
    <Box className={classes.container} component={Paper}>
      <List>
        {chores?.map((chore) => (
          <ChoreCard key={chore.id} chore={chore} />
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
