import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { Formik, Form, Field } from "formik";
import MuiTextField from "@material-ui/core/TextField";
import { fieldToTextField, TextFieldProps } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import { AddChoreValidation } from "../models/AddChoreValidation";
import { ChoreWithAssignments } from "../models/ChoreWithAssignments";
import { de } from "date-fns/locale";

type Prop = {
  open: boolean;
  chore?: ChoreWithAssignments;
  onCancel: () => void;
  onSave: (choreObject: ChoreWithAssignments) => void;
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
              id: props.chore ? props.chore.id : 0,
              name: props.chore ? props.chore.name : "",
              description: props.chore ? props.chore.description : "",
              value: props.chore ? props.chore.value : 5,
              dueDate: props.chore ? props.chore.dueDate : new Date(Date.now()),
              assignments: props.chore ? props.chore.assignments : [],
            }}
            // validating for the complete Formik-Component
            validate={(ChoreValidation) => {
              let validDateMessage: string = "";

              const validDate = (formValue: Date, actuellValue: Date) => {
                if (formValue.getFullYear() === actuellValue.getFullYear()) {
                  if (formValue.getMonth() === actuellValue.getMonth()) {
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

              const errors: Partial<AddChoreValidation> = {};
              if (!ChoreValidation.name) {
                errors.name = "Bitte definieren";
              } else if (!ChoreValidation.value) {
                errors.value = "Bitte definieren";
              } else if (ChoreValidation.value < 1) {
                errors.value = "Ein wenig unfair, nicht?";
              } else if (ChoreValidation.value > 99) {
                errors.value = "Du riskierst eine Inflation!";
              } else if (!validDate(ChoreValidation.dueDate, new Date())) {
                errors.dueDate = validDateMessage;
              }
              return errors;
            }}
            // submit-function passes for the complete Formik-Component
            onSubmit={(ChoreValidation) => {
              props.onSave(ChoreValidation);
            }}
          >
            {({ submitForm }) => (
              // Use any dateformat which is the best one for the backend!
              <MuiPickersUtilsProvider locale={de} utils={DateFnsUtils}>
                <Form>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <Typography>Was gibt es zu tun?</Typography>
                      <Box margin={2}>
                        <Field
                          inputProps={{ maxLength: 50 }}
                          component={ChoreTextField}
                          name="name"
                          type="text"
                          label="Ämtliname"
                        />
                      </Box>
                      <Box margin={2}>
                        <Field
                          inputProps={{ maxLength: 250 }}
                          multiline
                          rows={3}
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
                          format="dd.MMMM yy"
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
