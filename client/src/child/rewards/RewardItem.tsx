import { ListItemComponent } from "../ListItemComponent";
import { ChildListItem } from "../types/ChildListItem";
import { StepperControl } from "../types/StepperControl";
import { RewardWithGrants } from "../../model/RewardWithGrants";
import { mutateReward, useChildRewardPut } from "../BackendAccess";
import produce from "immer";
import { GrantState } from "../../model/GrantState";

type Props = {
  reward: RewardWithGrants;
};

export function RewardItem(props: Props): JSX.Element {
  const updateGrantMutation = useChildRewardPut();

  function updateState(reward: RewardWithGrants) {
    let nextState: number;

    if (reward.grants[0].state === GrantState.RequestConfirmed) {
      nextState = GrantState.Archived;
    } else if (reward.grants[0].state === GrantState.RequestRefused) {
      nextState = GrantState.Requested;
    } else {
      nextState = reward.grants[0].state + 1;
    }

    const updatedGrant = produce(reward.grants[0], (draftGrant) => {
      draftGrant.state = nextState;
    });

    updateGrantMutation.mutate(mutateReward(updatedGrant));
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

  function itemStepperControl(reward: RewardWithGrants): StepperControl {
    let activeStep = 0;
    let firstStepText =
      reward.grants[0].state === GrantState.RequestRefused
        ? "Abgelehnt"
        : "Verfügbar";

    if (reward.grants[0].state === GrantState.RequestRefused) {
      activeStep = 0;
    } else if (reward.grants[0].state === GrantState.RequestConfirmed) {
      activeStep = 2;
    } else {
      activeStep = reward.grants[0].state;
    }

    return {
      activeStep: activeStep,
      stepsText: [firstStepText, "Angefragt", "Bewilligt", "Eingelöst"],
      buttonText: ["Anfragen", "Warten", "Einlösen", "Anfragen", "Fertig"],
      disableButtonState: [GrantState.Requested, GrantState.Archived],
    };
  }

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
