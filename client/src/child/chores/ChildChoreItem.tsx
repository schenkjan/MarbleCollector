import { Chore } from "../models/Chore";
import {
  Avatar,
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Button,
  IconButton,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useState } from "react";
import ImgMarbles from "../../images/Marble.png";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ChoreWithAssignments } from "../../model/ChoreWithAssignments";
import { Assignment } from "../../model/Assignment";
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
      padding: "8px",
      textAlign: "center",
    },
    root: {
      width: "100%",
      padding: "8px",
      textAlign: "left",
    },
    stepButton: {
      "margin-bottom": "35px",
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
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  function assignmentStateToStepper(chore: ChoreWithAssignments): number {
    let steperState = 0;
    switch (chore.assignments[0].state) {
      case AssignmentState.Assigned: {
        steperState = 0;
        break;
      }
      case AssignmentState.Active: {
        steperState = 1;
        break;
      }
      case AssignmentState.RequestedToCheck: {
        steperState = 2;
        break;
      }
      case AssignmentState.CheckRefused: {
        steperState = 1;
        break;
      }
      case AssignmentState.CheckConfirmed: {
        steperState = 4;
        break;
      }
      case AssignmentState.Archived: {
        steperState = 5;
        break;
      }
    }
    return steperState;
  }

  function disableButton(): boolean {
    if (chore.assignments[0].state > 1) {
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
        <Typography variant="body2" color="textSecondary" component="p">
          {chore.description}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <div className={classes.root}> */}
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
          Weiter
        </Button>
      </CardActions>
    </Card>
  );
}
