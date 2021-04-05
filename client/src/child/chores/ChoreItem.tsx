import { ListItemComponent } from "../ListItemComponent";
import { ChildListItem } from "../types/ChildListItem";
import { StepperControl } from "../types/StepperControl";
import { AssignmentState } from "../../parent/models/AssignmentState";
import { ChoreWithAssignments } from "../../model/ChoreWithAssignments";
import { mutateChore, useChildChorePut } from "../ChildBackendAccess";
import produce from "immer";
import { useInfoNotification } from "../../shell/hooks/SnackbarHooks";
import { ConfettiRain } from "./ConfettiRain";
import { ConfettiProps } from "../types/ConfettiProps";
import { useState } from "react";
import React from "react";

type Props = {
  chore: ChoreWithAssignments;
  size: ConfettiProps;
};

export function ChoreItem(props: Props): JSX.Element {
  const updateAssignmentMutation = useChildChorePut();
  const showInfo = useInfoNotification();
  const [start, setStart] = useState(false);

  function clickHint(chore: ChoreWithAssignments) {
    switch (chore.assignments[0].state) {
      case AssignmentState.Archived: {
        showInfo("Ämtli wurde bereits erledigt");
        let trigger = false;
        setStart(trigger);
        break;
      }

      case AssignmentState.CheckConfirmed: {
        let trigger = true;
        setStart(trigger);
        break;
      }

      case AssignmentState.RequestedToCheck: {
        showInfo("Bitte warte auf die Bestätigung deiner Eltern");
        break;
      }
    }
  }

  function updateState(chore: ChoreWithAssignments) {
    let nextState: number;

    if (chore.assignments[0].state === AssignmentState.CheckConfirmed) {
      nextState = AssignmentState.Archived;
    } else if (chore.assignments[0].state === AssignmentState.CheckRefused) {
      nextState = AssignmentState.RequestedToCheck;
    } else {
      nextState = chore.assignments[0].state + 1;
    }

    const updatedAssignment = produce(
      chore.assignments[0],
      (draftAssignment) => {
        draftAssignment.state = nextState;
      }
    );

    updateAssignmentMutation.mutate(mutateChore(updatedAssignment));
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

    let seceondStepText =
      chore.assignments[0].state === AssignmentState.CheckRefused
        ? "Abgelehnt"
        : "Aktiv";

    if (chore.assignments[0].state === AssignmentState.CheckRefused) {
      activeStep = 1;
    } else if (chore.assignments[0].state === AssignmentState.Archived) {
      activeStep = 4;
    } else {
      activeStep = chore.assignments[0].state;
    }

    return {
      activeStep: activeStep,
      stepsText: ["Neu", seceondStepText, "Prüfen", "Erledigt"],
      buttonText: [
        "Start",
        "Prüfen lassen",
        "Warten",
        "Kassieren",
        "Prüfen lassen",
        "Fertig",
      ],
      disableButtonState: [
        AssignmentState.RequestedToCheck,
        AssignmentState.Archived,
      ],
    };
  }
  return (
    <React.Fragment>
      <ListItemComponent
        key={props.chore.id}
        showBadge={
          props.chore.assignments.filter(
            (assignment) =>
              assignment.state === AssignmentState.Assigned ||
              assignment.state === AssignmentState.CheckConfirmed ||
              assignment.state === AssignmentState.CheckRefused
          ).length
        }
        disableControl={false}
        item={mapToListItem(props.chore)}
        stepper={itemStepperControl(props.chore)}
        onNextStepClick={() => updateState(props.chore)}
        onTryClick={() => clickHint(props.chore)}
      />
      {start && <ConfettiRain size={props.size.size} />}
    </React.Fragment>
  );
}
