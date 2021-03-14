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
import { ChoreWithAssignments } from "../../model/ChoreWithAssignments";
import { AssignmentState } from "../../parent/models/AssignmentState";

type ChildChoreItemprops = {
  chore: ChoreWithAssignments;
  onUpdateState: (chore: ChoreWithAssignments) => void;
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

export function ChildChoreItem({
  chore,
  onUpdateState,
}: ChildChoreItemprops): JSX.Element {
  const classes = useStyles();
  const steps = getSteps();
  let buttonText = "Start";

  function assignmentStateToStepper(chore: ChoreWithAssignments): number {
    let steperState = 0;
    switch (chore.assignments[0].state) {
      case AssignmentState.Assigned: {
        steperState = 0;
        buttonText = "Start";
        break;
      }
      case AssignmentState.Active: {
        steperState = 1;
        buttonText = "Prüfen";
        break;
      }
      case AssignmentState.RequestedToCheck: {
        steperState = 2;
        buttonText = "Warten";
        break;
      }
      case AssignmentState.CheckRefused: {
        steperState = 1;
        buttonText = "Prüfen";
        break;
      }
      case AssignmentState.CheckConfirmed: {
        steperState = 3;
        buttonText = "Archiv";
        break;
      }
      case AssignmentState.Archived: {
        steperState = 4;
        buttonText = "Fertig";
        break;
      }
    }
    return steperState;
  }

  function disableButton(): boolean {
    if (
      chore.assignments[0].state === AssignmentState.RequestedToCheck ||
      chore.assignments[0].state === AssignmentState.Archived
    ) {
      return true;
    }
    return false;
  }

  return (
    <Card elevation={5}>
      <CardHeader
        className={classes.header}
        title={chore.name}
        subheader={new Date(chore.dueDate).toLocaleDateString("de-DE", {
          weekday: "short",
          year: "2-digit",
          month: "short",
          day: "numeric",
        })}
        avatar={
          <Avatar aria-label="Chore">{chore.name[0].toUpperCase()}</Avatar>
        }
        action={
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={chore.value}
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
          {chore.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Stepper
          className={classes.root}
          activeStep={assignmentStateToStepper(chore)}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Button
          onClick={() => onUpdateState(chore)}
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
