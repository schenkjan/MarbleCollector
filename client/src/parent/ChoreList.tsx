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
import { LoadingData } from "../api/models/LoadingData";
import { ChoreWithAssignments } from "./models/ChoreWithAssignments";
import { DeleteSingleData, GetData } from "../api/BackendAccess";

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

// const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

export function ChoreList(): JSX.Element {
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false);

  const queryInfo: LoadingData = GetData("/api/Chores/Assignments");
  const chores: ChoreWithAssignments[] = queryInfo.data;

  function handleOnCancel() {
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct cancel logic.
  }

  function handleOnDelete() {
    // DeleteSingleData("/api/Chores", 4);
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct delete logic.
  }

  function handleOnSave() {
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct save logic.
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
        onDelete={handleOnDelete}
        onSave={handleOnSave}
      />
    </Box>
  );
}
