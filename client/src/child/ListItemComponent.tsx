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
import ImgMarbles from "../images/Marble.png";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ChildListItem } from "./types/ChildListItem";
import { StepperControl } from "./types/StepperControl";
import { toDeLocaleDateString } from "../helper/DateHelper";

type Props = {
  showBadge: number;
  item: ChildListItem;
  stepper: StepperControl;
  onNextStepClick: () => void;
  onTryClick: () => void;
};

const theme = createMuiTheme({
  overrides: {
    MuiAvatar: {
      img: {
        opacity: "0.75",
      },
    },
    MuiBadge: {
      badge: {
        "font-weight": "bold",
        "font-size": "1.25rem",
      },
      anchorOriginBottomRightCircle: {
        transform: "scale(1) translate(40%, 50%)",
      },
    },
  },
});

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
    badgestyle: {
      "font-weight": "Bold",
      "font-size": "1rem",
      "padding-right": "8px",
    },
    content: {
      "padding-bottom": "0px",
      "padding-top": "4px",
      "padding-left": "8px",
      "padding-right": "8px",
      textAlign: "center",
    },
    description: {
      "padding-bottom": "8px",
      "padding-top": "0px",
      "padding-left": "16px",
      "padding-right": "16px",
      textAlign: "left",
    },
    actions: {
      padding: "2px",
      "margin-left": "0px",
    },
    root: {
      width: "80%",
      padding: "8px",
      "padding-right": "0px",
      "padding-left": "4px",
      textAlign: "left",
    },
    stepButton: {
      "margin-bottom": "35px",
      "margin-right": "16px",
      fontSize: "0.7rem",
    },
  })
);

export function ListItemComponent(props: Props) {
  const classes = useStyles();

  const subHeader = toDeLocaleDateString(props.item.dueDate);

  function onNextStepClick() {
    props.onNextStepClick();
  }

  function onTryClick() {
    props.onTryClick();
  }

  function disableButton(): boolean {
    let disable = false;
    props.stepper.disableButtonState.forEach(function (disableState) {
      if (props.item.state === disableState) {
        disable = true;
      }
    });

    return disable;
  }

  return (
    <Card elevation={5}>
      <CardHeader
        className={classes.header}
        title={props.item.name}
        subheader={props.item.dueDate ? subHeader : null}
        avatar={
          <Badge
            variant="dot"
            badgeContent={props.showBadge}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            color="secondary"
          >
            <Avatar aria-label="Chore">
              {props.item.name[0].toUpperCase()}
            </Avatar>
          </Badge>
        }
        action={
          <ThemeProvider theme={theme}>
            <Badge
              overlap="circle"
              className={classes.badgestyle}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={props.item.value}
            >
              <Avatar src={ImgMarbles}></Avatar>
            </Badge>
          </ThemeProvider>
        }
      />
      <CardContent className={classes.content}>
        <Typography
          className={classes.description}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {props.item.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Stepper
          className={classes.root}
          activeStep={props.stepper.activeStep}
          alternativeLabel
        >
          {props.stepper.stepsText.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div onClick={() => onTryClick()}>
          <Button
            onClick={() => onNextStepClick()}
            disabled={disableButton()}
            className={classes.stepButton}
            variant="contained"
            size="small"
            color="primary"
          >
            {props.stepper.buttonText[props.item.state]}
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
