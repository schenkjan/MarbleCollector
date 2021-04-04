import {
  Box,
  Button,
  createStyles,
  Dialog,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";
import { Field, Form, Formik } from "formik";
import { DatePicker } from "formik-material-ui-pickers";
import { useEffect, useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { de } from "date-fns/locale";
import { toDeLocaleDateString } from "../helper/DateHelper";

type Prop = {
  date: Date;
  textVariant?: "inherit" | Variant | undefined;
  textColor?:
    | "inherit"
    | "initial"
    | "textSecondary"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "error"
    | undefined;
  editable?: boolean;
  editLabel: string;
  validationSchema: any;
  onDateChanged?: (newDate: Date) => void;
};

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

export function EditableDate(props: Prop): JSX.Element {
  const classes = useStyles();
  const [date, setDate] = useState(new Date(Date.now()));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDate(props.date);
  }, [props.date]);

  function handleOnClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit(value: Date) {
    setDate(value);
    handleClose();
    props.onDateChanged && props.onDateChanged(value);
  }

  function getForm(): JSX.Element {
    return (
      <Formik
        initialValues={{ date: date }}
        validationSchema={props.validationSchema}
        onSubmit={(values) => handleSubmit(values.date)}
        onReset={handleClose}
      >
        <MuiPickersUtilsProvider locale={de} utils={DateFnsUtils}>
          <Form className={classes.form}>
            <Box display="flex" flexDirection="column">
              <Field
                component={DatePicker}
                name="date"
                label={props.editLabel}
                format="dd.MMMM yy"
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
        </MuiPickersUtilsProvider>
      </Formik>
    );
  }

  function isOpen(): boolean {
    return (props.editable ?? false) && open;
  }

  return (
    <Box onClick={handleOnClick}>
      <Typography
        variant={props.textVariant ?? "body2"}
        color={props.textColor ?? "initial"}
        className={classes.text}
      >
        {toDeLocaleDateString(date)}
      </Typography>
      <Dialog className={classes.modal} open={isOpen()} onClose={handleClose}>
        {getForm()}
      </Dialog>
    </Box>
  );
}
