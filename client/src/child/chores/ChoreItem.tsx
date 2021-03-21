import { ListItemComponent } from "../ListItemComponent";
import { ChildListItem } from "../types/ChildListItem";
import { StepperControl } from "../types/StepperControl";
import { AssignmentState } from "../../parent/models/AssignmentState";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { useQuery } from "react-query";
import axios from "axios";
import ErrorIcon from "@material-ui/icons/Error";
import { ChoreWithAssignments } from "../../model/ChoreWithAssignments";

type Props = {
  chore: ChoreWithAssignments;
};

export function ChoreItem(props: Props): JSX.Element {
  const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const [chore, setChore] = useState(props.chore);

  function updateState(chore: ChoreWithAssignments): void {
    const updatedChore = setNextAssignmentState(chore);
    console.log(updatedChore);
    setChore(updatedChore);
    //Optimisitic UI :-)
    //TODO hs (210314): Do we want an optimistic or pessimistic UI?
    // const updatedChores = chores.map((t) => (t.id !== id ? t : chore));
    // setChores(updatedChores);

    // TODO hs (210313): Implement Error handling and reset state in case of error
    axios
      .put<ChoreWithAssignments>(
        `${apiBaseUrl}/api/Assignments/` + updatedChore.assignments[0].id,
        updatedChore.assignments[0],
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((data) => console.log("update succesfull: ", data?.data));
  }

  function setNextAssignmentState(
    chore: ChoreWithAssignments
  ): ChoreWithAssignments {
    if (chore.assignments[0].state === AssignmentState.CheckConfirmed) {
      chore.assignments[0].state = chore.assignments[0].state + 2;
    } else if (chore.assignments[0].state === AssignmentState.CheckRefused)
      chore.assignments[0].state = AssignmentState.RequestedToCheck;
    else {
      chore.assignments[0].state++;
    }

    return chore;
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

  return (
    <ListItemComponent
      key={chore.id}
      // TODO hs (210319): Add show badge function
      showBadge={0}
      item={mapToListItem(chore)}
      stepper={itemStepperControl(chore)}
      onNextStepClick={() => updateState(chore)}
    />
  );
}
