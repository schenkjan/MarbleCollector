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
import { QueryGet, QueryPost } from "../../api/BackendAccess";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
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

  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [showDialog, setShowDialog] = useState(false);

  const { data } = QueryGet("parentChoreGet", "/api/Chores/Assignments/");
  const chores: ChoreWithAssignments[] = data;

  const {
    isLoading: isChildrenLoading,
    error: childrenError,
    children,
  } = useChildrenDataForUser();

  const addChoreMutation = QueryPost();

  function handleOnCancel() {
    setShowDialog(false);
  }

  function handleOnSave(choreObject: ChoreWithAssignments) {
    addChoreMutation.mutate({
      url: "/api/Chores/",
      object: choreObject,
      token: bearerToken,
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
