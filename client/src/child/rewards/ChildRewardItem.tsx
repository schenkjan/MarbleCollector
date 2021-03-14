import {
  Avatar,
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@material-ui/core";
import ImgMarbles from "../../images/Marble.png";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { RewardWithGrants } from "../../model/RewardWithGrants";
import { GrantState } from "../../parent/models/GrantState";

type ChildRewardItemprops = {
  reward: RewardWithGrants;
  onUpdateState: (reward: RewardWithGrants) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      textAlign: "left",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    moreOpen: {
      transform: "rotate(90deg)",
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
    content: {
      "padding-bottom": "0px",
      "padding-top": "4px",
      "padding-left": "8px",
      "padding-right": "8px",
      textAlign: "center",
    },
    description: {
      padding: "0px",
    },
    actions: {
      padding: "2px",
      "margin-left": "0px",
    },
    root: {
      width: "100%",
      padding: "8px",
      "padding-right": "0px",
      textAlign: "left",
    },
    stepButton: {
      "margin-bottom": "35px",
      "margin-right": "16px",
    },
  })
);

function getSteps() {
  return ["Neu", "Aktiv", "Prüfen", "Erledigt"];
}

export function ChildRewardItem({
  reward,
  onUpdateState,
}: ChildRewardItemprops): JSX.Element {
  const classes = useStyles();
  const steps = getSteps();
  let buttonText = "Start";

  function assignmentStateToStepper(reward: RewardWithGrants): number {
    let steperState = 0;
    switch (reward.grants[0].state) {
      case GrantState.Assigned: {
        steperState = 0;
        buttonText = "Start";
        break;
      }
      case GrantState.Requested: {
        steperState = 1;
        buttonText = "Prüfen";
        break;
      }
      case GrantState.Requested: {
        steperState = 2;
        buttonText = "Warten";
        break;
      }
      case GrantState.RequestRefused: {
        steperState = 1;
        buttonText = "Prüfen";
        break;
      }
      case GrantState.RequestConfirmed: {
        steperState = 3;
        buttonText = "Archiv";
        break;
      }
      case GrantState.Archived: {
        steperState = 4;
        buttonText = "Fertig";
        break;
      }
    }
    return steperState;
  }

  function disableButton(): boolean {
    if (
      reward.grants[0].state === GrantState.Requested ||
      reward.grants[0].state === GrantState.Archived
    ) {
      return true;
    }
    return false;
  }

  return (
    <Card elevation={5}>
      <CardHeader
        className={classes.header}
        title={reward.name}
        subheader={new Date(reward.value).toLocaleDateString("de-DE", {
          weekday: "short",
          year: "2-digit",
          month: "short",
          day: "numeric",
        })}
        avatar={
          <Avatar aria-label="Chore">{reward.name[0].toUpperCase()}</Avatar>
        }
        action={
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={reward.value}
          >
            <Avatar src={ImgMarbles}></Avatar>
          </Badge>
        }
      />
      <CardContent className={classes.content}>
        <Typography
          className={classes.description}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {reward.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Stepper
          className={classes.root}
          activeStep={assignmentStateToStepper(reward)}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Button
          onClick={() => onUpdateState(reward)}
          disabled={disableButton()}
          className={classes.stepButton}
          variant="contained"
          size="small"
          color="primary"
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
