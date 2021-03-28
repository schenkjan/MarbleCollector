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
import Grid from "@material-ui/core/Grid";

type Props = {
  disableControl: boolean;
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
      "padding-left": "4px",
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
      "padding-left": "0px",
      "padding-right": "0px",
      "margin-left": "0px",
    },
    root: {
      padding: "8px",
      "padding-right": "0px",
      "padding-left": "0px",
      textAlign: "left",
    },
    stepElement: {
      width: "4.3rem",
      padding: "0px",
    },
    stepButton: {
      "margin-bottom": "20px",
      "margin-left": "4px",
      padding: "4px",
      fontSize: "0.7rem",
    },
    gridButton: {
      "padding-top": "6px",
      "padding-right": "2px",
      "margin-bottom": "auto",
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
        <Grid
          container
          spacing={0}
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item sm={10}>
            <Stepper
              className={classes.root}
              activeStep={props.stepper.activeStep}
              alternativeLabel
            >
              {props.stepper.stepsText.map((label) => (
                <Step className={classes.stepElement} key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item className={classes.gridButton}>
            <div onClick={() => onTryClick()}>
              <Button
                onClick={() => onNextStepClick()}
                disabled={disableButton() || props.disableControl}
                className={classes.stepButton}
                variant="contained"
                size="small"
                color="primary"
              >
                {props.stepper.buttonText[props.item.state]}
              </Button>
            </div>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
