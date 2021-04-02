import {
  Avatar,
  Badge,
  Box,
  Button,
  createStyles,
  Dialog,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import ImgMarbles from "../images/Marble.png";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { SinglelineTextField } from "./SinglelineTextField";

type Prop = {
  value: number;
  editable?: boolean;
  editLabel: string;
  validationSchema: any;
  notifications: number;
  onValueChanged?: (value: number) => void;
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
    form: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      minWidth: "260px",
    },
    text: {
      textAlign: "left",
    },
    badgestyle: {
      "font-weight": "Bold",
      "font-size": "1rem",
      "padding-right": "8px",
    },
    doneNotificationBadge: {
      color: "white",
      backgroundColor: theme.palette.success.light,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      "margin-top": theme.spacing(1),
    },
  })
);

export function EditableTextAvatar(props: Prop): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function handleOnClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit(value: number) {
    setValue(value);
    handleClose();
    props.onValueChanged && props.onValueChanged(value);
  }

  function getForm(): JSX.Element {
    return (
      <Formik
        initialValues={{ value: value }}
        validationSchema={props.validationSchema}
        onSubmit={(values) => handleSubmit(values.value)}
        onReset={handleClose}
      >
        <Form className={classes.form}>
          <Box display="flex" flexDirection="column">
            <Field
              component={SinglelineTextField}
              name="value"
              type="number"
              label={props.editLabel}
            />
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
            >
              Speichern
            </Button>
            <Button
              className={classes.button}
              type="reset"
              variant="outlined"
              color="primary"
            >
              Abbruch
            </Button>
          </Box>
        </Form>
      </Formik>
    );
  }

  function isOpen(): boolean {
    return (props.editable ?? false) && open;
  }

  return (
    <Badge
      classes={{ badge: classes.doneNotificationBadge }}
      badgeContent={props.notifications}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <ThemeProvider theme={theme}>
        <Badge
          onClick={handleOnClick}
          overlap="circle"
          className={classes.badgestyle}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={props.value}
        >
          <Avatar src={ImgMarbles}>{props.value.toString()}</Avatar>
        </Badge>
      </ThemeProvider>

      <Dialog className={classes.modal} open={isOpen()} onClose={handleClose}>
        {getForm()}
      </Dialog>
    </Badge>
  );
}
