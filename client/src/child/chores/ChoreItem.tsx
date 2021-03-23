import { ListItemComponent } from "../ListItemComponent";
import { ChildListItem } from "../types/ChildListItem";
import { StepperControl } from "../types/StepperControl";
import { AssignmentState } from "../../parent/models/AssignmentState";
import { ChoreWithAssignments } from "../../model/ChoreWithAssignments";
import { Card } from "@material-ui/core";
//todo, 210322 hs move backendaccess to common folder
import { useUpdateChoreState} from "../../parent/BackendAccess"; 
import produce from "immer";

type Props = {
  chore: ChoreWithAssignments;
};

export function ChoreItem(props: Props): JSX.Element {
  const updateAssignmentMutation = useUpdateChoreState();

  function updateState(chore: ChoreWithAssignments) {
    let nextState: number;

    if (chore.assignments[0].state === AssignmentState.CheckConfirmed) {
      nextState = AssignmentState.Archived; //chore.assignments[0].state + 2;
    } else if (chore.assignments[0].state === AssignmentState.CheckRefused){
      nextState = AssignmentState.RequestedToCheck;
    }
    else {
      nextState = chore.assignments[0].state + 1;
    }

    const updatedAssignment = produce(chore.assignments[0], (draftAssignment) => {
      draftAssignment.state =  nextState;
    });

    updateAssignmentMutation.mutate(updatedAssignment);
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

  if (updateAssignmentMutation.isLoading)
  return (
    <Card elevation={5}>
      <p>Updating...</p>
    </Card>
  ); // TODO hs (210322): Implement more sophisticated loading screen. Refactor to general loading screen/overlay?

  if (updateAssignmentMutation.error)
  return (
    <Card elevation={5}>
       <p>{`An error has occurred: ${updateAssignmentMutation.error}`}</p>
    </Card>
    
  ); // TODO hs (210322): Implement more sophisticated error screen. Refactor to general error screen?

  return (
    <ListItemComponent
      key={props.chore.id}
      // TODO hs (210319): Add show badge function
      showBadge={0}
      item={mapToListItem(props.chore)}
      stepper={itemStepperControl(props.chore)}
      onNextStepClick={() => updateState(props.chore)}
    />
  );
}
