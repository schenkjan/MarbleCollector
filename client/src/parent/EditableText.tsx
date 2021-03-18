import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Popover,
  Theme,
  Typography,
} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { TextField } from "./TextField";

type Prop = {
  text: string;
  onTextChanged?: (newText: string) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      padding: theme.spacing(2),
    },
  })
);

export function EditableText(props: Prop): JSX.Element {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    setText(props.text);
  }, [props.text]);

  function handleOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
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
        validationSchema={Yup.object({
          text: Yup.string()
            .required("Bitte definieren") // TODO js (17.03.2021): Use parameter.
            .max(50, "Maximum 50 Zeichen"), // TODO js (17.03.2021): Use parameter.
        })}
        onSubmit={(values) => handleSubmit(values.text)}
        onReset={handleClose}
      >
        <Form className={classes.form}>
          <Box display="flex" flexDirection="column">
            <Field
              component={TextField}
              name="text"
              type="text"
              label="Label"
            />
            <ErrorMessage name="text" />
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

  return (
    <Box onClick={handleOnClick}>
      <Typography variant="body2">{text}</Typography>
      <Popover
        open={Boolean(anchorEl)}
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
