import { ListItemComponent } from "../ListItemComponent";
import { ChildListItem } from "../types/ChildListItem";
import { StepperControl } from "../types/StepperControl";
import { AssignmentState } from "../../parent/models/AssignmentState";
import { useState } from "react";
import {
  Box,
  Container,
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
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      flex: "1 1 auto",
      padding: "1px",
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

  function updateState(id: number): void {
    const chore: ChoreWithAssignments | any = chores.find(
      (chore) => chore.id === id
    );

    setNextAssignmentState(chore);
    //Optimisitic UI :-)
    // TODO hs (210314): Do we want an optimistic or pessimistic UI?
    const updatedChores = chores.map((t) => (t.id !== id ? t : chore));
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

  function setNextAssignmentState(chore: ChoreWithAssignments | any) {
    if (chore.assignments[0].state === AssignmentState.CheckConfirmed) {
      chore.assignments[0].state = chore.assignments[0].state + 2;
    } else if (chore.assignments[0].state === AssignmentState.CheckRefused)
      chore.assignments[0].state = AssignmentState.RequestedToCheck;
    else {
      chore.assignments[0].state++;
    }
  }

  function mapToListItem(chore: ChoreWithAssignments): ChildListItem {
    return {
      id: chore.id,
      name: chore.name,
      description: chore.description,
      value: chore.value,
      dueDate: chore.dueDate,
      state: chore.assignments[0].state,
    };
  }

  function itemStepperControl(chore: ChoreWithAssignments): StepperControl {
    let activeStep = 0;
    if (chore.assignments[0].state === AssignmentState.CheckRefused) {
      activeStep = 1;
    } else if (chore.assignments[0].state === AssignmentState.Archived) {
      activeStep = 4;
    } else {
      activeStep = chore.assignments[0].state;
    }

    return {
      activeStep: activeStep,
      stepsText: ["Neu", "Aktiv", "Prüfen", "Erledigt"],
      buttonText: ["Start", "Prüfen", "Warten", "Murmel", "Prüfen", "Fertig"],
      disableButtonState: [
        AssignmentState.RequestedToCheck,
        AssignmentState.Archived,
      ],
    };
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
    <Container maxWidth="md">
      <Box className={classes.box} component={Paper}>
        <List>
          {chores?.map((chore) => (
            <ListItemComponent
              key={chore.id}
              // TODO hs (210319): Add show badge function
              showBadge={0}
              item={mapToListItem(chore)}
              stepper={itemStepperControl(chore)}
              onNextStepClick={() => updateState(chore.id)}
            />
          ))}
        </List>
      </Box>
    </Container>
  );
}
