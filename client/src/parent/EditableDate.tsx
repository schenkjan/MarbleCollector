import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Popover,
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
    },
    text: {
      textAlign: "left",
    },
  })
);

export function EditableDate(props: Prop): JSX.Element {
  const classes = useStyles();
  const [date, setDate] = useState(new Date(Date.now()));
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    setDate(props.date);
  }, [props.date]);

  function handleOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
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
              <Button type="submit" variant="contained" color="primary">
                Speichern
              </Button>
              <Button type="reset" variant="outlined" color="primary">
                Abbruch
              </Button>
            </Box>
          </Form>
        </MuiPickersUtilsProvider>
      </Formik>
    );
  }

  function isOpen(): boolean {
    return (props.editable ?? false) && Boolean(anchorEl);
  }

  return (
    <Box onClick={handleOnClick}>
      <Typography
        variant={props.textVariant ?? "body2"}
        color={props.textColor ?? "initial"}
        className={classes.text}
      >
        {new Date(date).toLocaleDateString("de-DE", {
          weekday: "short",
          year: "2-digit",
          month: "short",
          day: "numeric",
        })}
      </Typography>
      <Popover
        open={isOpen()}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {getForm()}
      </Popover>
    </Box>
  );
}
