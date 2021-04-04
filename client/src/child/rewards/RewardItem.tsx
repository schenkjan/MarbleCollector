import { ListItemComponent } from "../ListItemComponent";
import { ChildListItem } from "../types/ChildListItem";
import { StepperControl } from "../types/StepperControl";
import { RewardWithGrants } from "../../model/RewardWithGrants";
import { mutateReward, useChildRewardPut } from "../ChildBackendAccess";
import produce from "immer";
import { GrantState } from "../../model/GrantState";
import { useInfoNotification } from "../../shell/hooks/SnackbarHooks";

type Props = {
  reward: RewardWithGrants;
  balance: number;
};

export function RewardItem(props: Props): JSX.Element {
  const updateGrantMutation = useChildRewardPut();
  const showInfo = useInfoNotification();

  function clickHint(reward: RewardWithGrants, balance: number) {
    switch (reward.grants[0].state) {
      case GrantState.Archived: {
        showInfo("Belohnung wurde bereits eingelöst");
        break;
      }
      case GrantState.Requested: {
        showInfo("Bitte warte auf die Bestätigung deiner Eltern");
        break;
      }
      case GrantState.Assigned: {
        if (checkForInsufficientBalance(reward, balance)) {
          showInfo(
            "Leider hast du nicht genügend Murmeln, erledige doch ein Ämtli :-)"
          );
          break;
        }
      }
    }
  }

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

  function checkForInsufficientBalance(
    reward: RewardWithGrants,
    balance: number
  ): boolean {
    if (reward.value > balance) {
      console.log(balance);
      return true;
    } else {
      return false;
    }
  }

  return (
    <ListItemComponent
      key={props.reward.id}
      showBadge={
        props.reward.grants.filter(
          (grant) =>
            grant.state === GrantState.Assigned ||
            grant.state === GrantState.RequestRefused ||
            grant.state === GrantState.RequestConfirmed
        ).length
      }
      disableControl={checkForInsufficientBalance(props.reward, props.balance)}
      item={mapToListItem(props.reward)}
      stepper={itemStepperControl(props.reward)}
      onNextStepClick={() => updateState(props.reward)}
      onTryClick={() => clickHint(props.reward, props.balance)}
    />
  );
}
