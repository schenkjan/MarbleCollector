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
import { useQueryGet, useQueryPost } from "../../api/BackendAccess";
import { ChoreWithAssignments } from "../models/ChoreWithAssignments";
import { useChildrenDataForUser } from "../BackendAccess";

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

  // const { data } = useQueryGet<ChoreLoadingData>(
  //   "parentChoreGet",
  //   "/api/Chores/Assignments/"
  // );
  const { data } = useQueryGet("parentChoreGet", "/api/Chores/Assignments/");
  const chores: ChoreWithAssignments[] = data;

  const {
    isLoading: isChildrenLoading,
    error: childrenError,
    children,
  } = useChildrenDataForUser();

  const addChoreMutation = useQueryPost("parentChoreGet");

  function handleOnCancel() {
    setShowDialog(false);
  }

  function handleOnSave(choreObject: ChoreWithAssignments) {
    addChoreMutation.mutate({
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
