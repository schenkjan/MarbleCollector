import {
  Box,
  CircularProgress,
  Paper,
  TableContainer,
  Table,
  TableBody,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { ChoreTableRow } from "./ChoreTableRow";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ErrorIcon from "@material-ui/icons/Error";
import { ChoreWithAssignments } from "../models/ChoreWithAssignments";
import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { AddChoreDialog } from "./AddChoreDialog";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { useState } from "react";
import {
  useInfoNotification,
  useSuccessNotification,
} from "../../shell/hooks/SnackbarHooks";

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

  const showInfo = useInfoNotification();
  const showSuccess = useSuccessNotification();

  const bearerToken = useRecoilValue(AppState.userBearerToken);

  const { isLoading, error, data: chores } = useQuery("parentChoreData", () =>
    axios
      .get<ChoreWithAssignments[]>(`${apiBaseUrl}/api/Chores/Assignments`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((data) => data?.data)
  );

  function handleOnCancel() {
    showInfo("abgebrochen");
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct cancel logic.
  }

  function handleOnDelete() {
    showInfo("Ämtli gelöscht");
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct delete logic.
  }

  function handleOnSave(ChoreObject: object) {
    alert(JSON.stringify(ChoreObject, null, 2));
    showSuccess("Ämtli erstellt");
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct save logic.
  }

  function handleAddChore() {
    setShowDialog(true);
  }

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

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table stickyHeader aria-label="sticky table" size="small">
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
