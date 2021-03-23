import {
  Avatar,
  Badge,
  Box,
  Button,
  createStyles,
  makeStyles,
  Popover,
  Theme,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { TextField } from "./TextField";

type Prop = {
  value: number;
  editable?: boolean;
  editLabel: string;
  validationSchema: any;
  notifications: number;
  onValueChanged?: (value: number) => void;
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

export function EditableTextAvatar(props: Prop): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function handleOnClick(event: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
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
              component={TextField}
              name="value"
              type="number"
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
    return (props.editable ?? false) && Boolean(anchorEl);
  }

  return (
    <Badge
      badgeContent={props.notifications}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      color="primary"
    >
      <Avatar onClick={handleOnClick}>{props.value.toString()}</Avatar>
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
    </Badge>
  );
}
