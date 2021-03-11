import {
  Box,
  CircularProgress,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { ChoreTableRow } from "./ChoreTableRow";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ErrorIcon from "@material-ui/icons/Error";
import { ChoreWithAssignments } from "./models/ChoreWithAssignments";
import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AppState } from "../AppState";
import { AddChoreDialog } from "./AddChoreDialog";
import { useEffect, useState } from "react";
import { DashboardState } from "../shell/DashboardState";
import { useDashboardTitle } from "../shell/hooks/DashboardTitleHook";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flex: "1 1 auto",
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(6),
      right: theme.spacing(2),
    },
  })
);

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

export function ChoreTable(): JSX.Element {
  const classes = useStyles();
  useDashboardTitle("Ämtli Pinnwand");
  const [showDialog, setShowDialog] = useState(false);
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [snack, setSnackState] = useRecoilState(AppState.snackState);

  const { isLoading, error, data: chores } = useQuery("parentChoreData", () =>
    axios
      .get<ChoreWithAssignments[]>(`${apiBaseUrl}/api/Chores/Assignments`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((data) => data?.data)
  );

  if (isLoading)
    return (
      <Box>
        <p>Loading...</p>
        <CircularProgress />
      </Box>
    ); // TODO js (04.03.2021): Implement more sophisticated loading screen. Refactor to general loading screen/overlay?

  if (error)
    return (
      <Box>
        <ErrorIcon color="secondary" fontSize="large" />
        <p>{`An error has occurred: ${error}`}</p>
      </Box>
    ); // TODO js (04.03.2021): Implement more sophisticated error screen. Refactor to general error screen?

  function handleOnCancel() {
    setSnackState({
      open: true,
      message: "abgebrochen",
      severity: "info",
    });
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct cancel logic.
  }

  function handleOnDelete() {
    setSnackState({
      open: true,
      message: "Ämtli gelöscht",
      severity: "info",
    });
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct delete logic.
  }

  function handleOnSave(ChoreObject: object) {
    alert(JSON.stringify(ChoreObject, null, 2));
    setSnackState({
      open: true,
      message: "Ämtli erstellt",
      severity: "success",
    });
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct save logic.
  }

  function handleAddChore() {
    setShowDialog(true);
  }

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table stickyHeader aria-label="sticky table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ämtli</TableCell>
            <TableCell></TableCell>
            <TableCell align="center">Done</TableCell>
            <TableCell align="center">Bestätigen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chores?.map((chore) => (
            <ChoreTableRow key={chore.id} chore={chore} />
          ))}
        </TableBody>
      </Table>
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
    </TableContainer>
  );
}
