import { ListItemComponent } from "../ListItemComponent";
import { ChildListItem } from "../types/ChildListItem";
import { StepperControl } from "../types/StepperControl";
import { AssignmentState } from "../../parent/models/AssignmentState";
import { RewardWithGrants } from "../../model/RewardWithGrants";
import { Card } from "@material-ui/core";
//todo, 210322 hs move backendaccess to common folder
import { useUpdateRewardState} from "../../parent/BackendAccess"; 
import produce from "immer";
import { GrantState } from "../../model/GrantState";

type Props = {
  reward: RewardWithGrants;
};

export function RewardItem(props: Props): JSX.Element {
  const updateGrantMutation = useUpdateRewardState();

  function updateState(reward: RewardWithGrants) {
    let nextState: number;

    if (reward.grants[0].state === GrantState.RequestConfirmed) {
      nextState = AssignmentState.Archived; 
    } else if (reward.grants[0].state === GrantState.Requested){
      nextState = AssignmentState.RequestedToCheck;
    }
    else {
      nextState = reward.grants[0].state + 1;
    }

    const updatedGrant = produce(reward.grants[0], (draftGrant) => {
      draftGrant.state =  nextState;
    });

    updateGrantMutation.mutate(updatedGrant);
  }

  function mapToListItem(reward: RewardWithGrants): ChildListItem {
    return {
      id: reward.id,
      name: reward.name,
      description: reward.description,
      value: reward.value,
      dueDate: null,
      state: reward.grants[0].state,
    };
  }

  function itemStepperControl(chore: RewardWithGrants): StepperControl {
    let activeStep = 0;
    // if (chore.assignments[0].state === AssignmentState.CheckRefused) {
    //   activeStep = 1;
    // } else if (chore.assignments[0].state === AssignmentState.Archived) {
    //   activeStep = 4;
    // } else {
    //   activeStep = chore.assignments[0].state;
    // }

    return {
      activeStep: activeStep,
      stepsText: ["Neu", "Angefragt", "Bewilligt"],
      buttonText: ["Anfragen", "Fertig"],
      disableButtonState: [
        AssignmentState.RequestedToCheck,
        AssignmentState.Archived,
      ],
    };
  }

  if (updateGrantMutation.isLoading)
  return (
    <Card elevation={5}>
      <p>Updating...</p>
    </Card>
  ); // TODO hs (210322): Implement more sophisticated loading screen. Refactor to general loading screen/overlay?

  if (updateGrantMutation.error)
  return (
    <Card elevation={5}>
       <p>{`An error has occurred: ${updateGrantMutation.error}`}</p>
    </Card>
    
  ); // TODO hs (210322): Implement more sophisticated error screen. Refactor to general error screen?

  return (
    <ListItemComponent
      key={props.reward.id}
      // TODO hs (210319): Add show badge function
      showBadge={0}
      item={mapToListItem(props.reward)}
      stepper={itemStepperControl(props.reward)}
      onNextStepClick={() => updateState(props.reward)}
    />
  );
}
