import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Modal,
  Theme,
  Typography,
} from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { MulilineTextField } from "./MulilineTextField";

type Prop = {
  text: string;
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
  onTextChanged?: (newText: string) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      padding: theme.spacing(2),
    },
    text: {
      textAlign: "left",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 2, 2),
    },
  })
);

export function EditableText(props: Prop): JSX.Element {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setText(props.text);
  }, [props.text]);

  function handleOnClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit(value: string) {
    setText(value);
    handleClose();
    props.onTextChanged && props.onTextChanged(value);
  }

  function getForm(): JSX.Element {
    return (
      <Formik
        initialValues={{ text: text }}
        validationSchema={props.validationSchema}
        onSubmit={(values) => handleSubmit(values.text)}
        onReset={handleClose}
      >
        <Form className={classes.form}>
          <Box className={classes.paper} display="flex" flexDirection="column">
            <Field
              component={MulilineTextField}
              name="text"
              type="text"
              label={props.editLabel}
            />
            <Button type="submit" variant="contained" color="primary">
              Speichern
            </Button>
            <Button type="reset" variant="outlined" color="primary">
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
    <Box onClick={handleOnClick}>
      <Typography
        variant={props.textVariant ?? "body2"}
        color={props.textColor ?? "initial"}
        className={classes.text}
      >
        {text
          ? text
          : props.editable
          ? "Nicht definiert. Text mit Klick hinzufügen."
          : ""}
      </Typography>
      <Modal className={classes.modal} open={isOpen()} onClose={handleClose}>
        {getForm()}
      </Modal>
    </Box>
  );
}
