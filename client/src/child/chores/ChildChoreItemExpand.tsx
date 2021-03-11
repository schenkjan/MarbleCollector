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
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState } from "react";
import ImgMarbles from "../../images/Marble.png";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ChoreWithAssignments } from "../../model/ChoreWithAssignments";

type Prop = {
  chore: ChoreWithAssignments;
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

function getStepContent(stepIndex: any) {
  switch (stepIndex) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown stepIndex";
  }
}

export function ChildChoreItemExpand(props: Prop): JSX.Element {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card elevation={5}>
      <CardHeader
        className={classes.header}
        title={props.chore.name}
        subheader={new Date(props.chore.dueDate).toLocaleDateString("de-DE", {
          weekday: "short",
          year: "2-digit",
          month: "short",
          day: "numeric",
        })}
        avatar={
          <Avatar aria-label="Chore">
            {props.chore.name[0].toUpperCase()}
          </Avatar>
        }
        action={
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={props.chore.value}
          >
            <Avatar src={ImgMarbles}></Avatar>
          </Badge>
        }
      />

      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        size="small"
      >
        <ExpandMoreIcon />
      </IconButton>
      <Collapse in={expanded} timeout="auto">
        <CardContent className={classes.content}>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.chore.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Stepper
            className={classes.root}
            activeStep={activeStep}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Button
            className={classes.stepButton}
            variant="contained"
            size="small"
            color="primary"
          >
            Weiter
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}
