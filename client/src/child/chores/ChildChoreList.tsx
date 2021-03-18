import { ChildChoreItem } from "./ChildChoreItem";
import { useState } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  List,
} from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { useQuery } from "react-query";
import axios from "axios";
import ErrorIcon from "@material-ui/icons/Error";
import { ChoreWithAssignments } from "../../model/ChoreWithAssignments";
import { AssignmentState } from "../../parent/models/AssignmentState";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";

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

export function ChildChoreList(): JSX.Element {
  const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const userId = useRecoilValue(AppState.userId);
  const classes = useStyles();
  const [chores, setChores] = useState<ChoreWithAssignments[]>([]);
  useDashboardTitle("Ämtli Pinnwand");

  function updateState(chore: ChoreWithAssignments): void {
    setNextAssignmentState(chore);

    //Optimisitic UI :-)
    // TODO hs (210314): Do we want an optimistic or pessimistic UI?
    const updatedChores = chores.map((t) => (t.id !== chore.id ? t : chore));
    setChores(updatedChores);

    // TODO hs (210313): Implement Error handling and reset state in case of error
    axios
      .put<ChoreWithAssignments>(
        `${apiBaseUrl}/api/Assignments/` + chore.id,
        chore.assignments[0],
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((data) => console.log("update succesfull: ", data?.data));
  }

  function setNextAssignmentState(chore: ChoreWithAssignments) {
    if (chore.assignments[0].state === AssignmentState.CheckConfirmed) {
      chore.assignments[0].state = chore.assignments[0].state + 2;
    } else if (chore.assignments[0].state === AssignmentState.CheckRefused)
      chore.assignments[0].state = AssignmentState.RequestedToCheck;
    else {
      chore.assignments[0].state++;
    }
  }

  const { isLoading, error } = useQuery("childChoreData", () =>
    axios
      .get<ChoreWithAssignments[]>(
        `${apiBaseUrl}/api/Chores/Assignments/Users/` + userId,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((data) => setChores(data?.data))
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

  return (
    <Box className={classes.container} component={Paper}>
      <List>
        {chores?.map((chore) => (
          <ChildChoreItem
            key={chore.id}
            chore={chore}
            onUpdateState={updateState}
          />
        ))}
      </List>
    </Box>
  );
}
