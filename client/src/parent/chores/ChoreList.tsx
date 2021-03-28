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
import {
  mutateChore,
  useParentChoreGet,
  useParentChorePost,
} from "../../api/BackendAccess";
import { ChoreWithAssignments } from "../models/ChoreWithAssignments";
import { useChildrenDataForUser } from "../BackendAccess";
import produce from "immer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flex: "1 1 auto",
      padding: "1px",
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(9),
      right: theme.spacing(2),
      zIndex: 42, // Answer to the Ultimate Question of Life, The Universe, and Everything (https://www.google.com/search?q=the+answer+to+life+the+universe+and+everything)
    },
  })
);

export function ChoreList(): JSX.Element {
  useDashboardTitle("Ämtli Pinnwand");
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false);
  const [choreToEdit, setChoreToEdit] = useState<ChoreWithAssignments>();
  const { data: chores } = useParentChoreGet();
  const addChore = useParentChorePost();
  const { children } = useChildrenDataForUser(); // TODO js (25.03.2021): Move to generic backend access file.

  function handleOnCancel() {
    setChoreToEdit(undefined);
    setShowDialog(false);
  }

  function handleOnSave(choreObject: ChoreWithAssignments) {
    addChore.mutate(mutateChore(choreObject));
    setShowDialog(false);
  }

  function handleAddChore() {
    setShowDialog(true);
  }

  function handleCopyChore(chore: ChoreWithAssignments) {
    const choreCopy = produce(chore, (draftChore: ChoreWithAssignments) => {
      draftChore.id = 0;
      draftChore.dueDate = new Date(Date.now());
      draftChore.assignments = [];
    });
    setChoreToEdit(choreCopy);
    setShowDialog(true);
  }

  return (
    <Box className={classes.container} component={Paper}>
      <List>
        {chores?.map((chore) => (
          <ChoreCard
            key={chore.id}
            chore={chore}
            children={children}
            onCopyChore={handleCopyChore}
          />
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
        chore={choreToEdit}
        onCancel={handleOnCancel}
        onSave={handleOnSave}
      />
    </Box>
  );
}
