import {
  Grid,
  Button,
  FormControlLabel,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import * as React from "react";
import { Formik, Form, Field } from "formik";
import MuiTextField from "@material-ui/core/TextField";
import { fieldToTextField, TextFieldProps, Switch } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import { ChoreValidation } from "../model/ChoreValidation";
import { AddChoreState } from "../shell/models/AddChoreState";

type Prop = {
  open: boolean;
  onCancel: () => void;
  onSave: (choreObject: AddChoreState) => void;
};

function ChoreTextField(props: TextFieldProps) {
  const {
    form: { setFieldValue },
    field: { name },
  } = props;
  const onChange = React.useCallback(
    (event) => {
      const { value } = event.target;
      setFieldValue(name, value);
    },
    [setFieldValue, name]
  );
  return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}

export function AddChoreDialog(props: Prop) {
  return (
    <Dialog open={props.open}>
      <DialogContent>
        <DialogContentText>
          <Formik
            // init for the complete Formik-Component --> (GET-method in edit szenario)

            initialValues={{
              name: "Rakete bauen (60min)",
              description: "mit Hammer und Nägeln",
              value: 10,
              dueDate: new Date(),
            }}
            // validating for the complete Formik-Component
            validate={(ChoreValidation) => {
              let validDateMessage: string = "";

              const validDate = (formValue: Date, actuellValue: Date) => {
                if (formValue.getFullYear() == actuellValue.getFullYear()) {
                  if (formValue.getMonth() == actuellValue.getMonth()) {
                    if (formValue.getDate() >= actuellValue.getDate()) {
                      return true;
                    } else {
                      validDateMessage =
                        "Ausgewählter Tag liegt in der Vergangenheit";
                      return false;
                    }
                  } else if (formValue.getMonth() > actuellValue.getMonth()) {
                    return true;
                  } else {
                    validDateMessage =
                      "Ausgewählter Monat liegt in der Vergangenheit";
                    return false;
                  }
                } else if (
                  formValue.getFullYear() > actuellValue.getFullYear()
                ) {
                  return true;
                } else {
                  validDateMessage =
                    "Ausgewähltes Jahr liegt in der Vergangenheit";
                  return false;
                }
              };

              const errors: Partial<ChoreValidation> = {};
              if (!ChoreValidation.name) {
                errors.choreName = "Bitte definieren";
              } else if (!ChoreValidation.value) {
                errors.choreValue = "Bitte definieren";
              } else if (ChoreValidation.value < 1) {
                errors.choreValue = "Ein wenig unfair, nicht?";
              } else if (!validDate(ChoreValidation.dueDate, new Date())) {
                errors.date = validDateMessage;
              }
              return errors;
            }}
            // submit-function passes for the complete Formik-Component
            onSubmit={(ChoreValidation) => {
              const ChoreTotal = {
                id: 0,
                name: ChoreValidation.name,
                description: ChoreValidation.description,
                value: ChoreValidation.value,
                dueDate: ChoreValidation.dueDate,
                assignments: [],
              };
              props.onSave(ChoreTotal);
            }}
          >
            {({ submitForm }) => (
              // Use any dateformat which is the best one for the backend!
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <Box margin={2}>
                        <Field
                          component={ChoreTextField}
                          name="name"
                          type="text"
                          label="Ämtliname"
                        />
                      </Box>
                      <Box margin={2}>
                        <Field
                          component={ChoreTextField}
                          name="description"
                          type="text"
                          label="Ämtlibeschreibung"
                        />
                      </Box>
                      <Box margin={2}>
                        <Field
                          component={ChoreTextField}
                          name="value"
                          type="number"
                          label="Wert in Murmeln"
                        />
                      </Box>
                      <Box margin={2}>
                        <Field
                          component={DatePicker}
                          name="dueDate"
                          label="Erledigt bis:"
                        />
                      </Box>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={submitForm}
                      >
                        Speichern
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={props.onCancel}
                      >
                        Abbrechen
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </MuiPickersUtilsProvider>
            )}
          </Formik>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
