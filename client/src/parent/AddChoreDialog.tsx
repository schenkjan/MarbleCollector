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

type Prop = {
  open: boolean;
  onCancel: () => void;
  onDelete: () => void;
  onSave: (choreObject: {}) => void;
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
              choreName: "Rakete bauen (60min)",
              choreValue: 10,
              childSelect: true,
              childSelect2: false,
              date: new Date(),
              rememberMe: true,
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
              if (!ChoreValidation.choreName) {
                errors.choreName = "Bitte definieren";
              } else if (!ChoreValidation.choreValue) {
                errors.choreValue = "Bitte definieren";
              } else if (ChoreValidation.choreValue < 1) {
                errors.choreValue = "Ein wenig unfair, nicht?";
              } else if (!validDate(ChoreValidation.date, new Date())) {
                errors.date = validDateMessage;
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
                          name="choreName"
                          type="text"
                          label="Ämtlibezeichnung"
                        />
                      </Box>
                      <Box margin={2}>
                        <Field
                          component={ChoreTextField}
                          name="choreValue"
                          type="number"
                          label="Wert in Murmeln"
                        />
                      </Box>
                      <Box margin={3}>
                        <FormControlLabel
                          control={<Field type="checkbox" name="childSelect" />}
                          label="Peter"
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <Field type="checkbox" name="childSelect2" />
                          }
                          label="Margret"
                        />
                      </Box>
                      <Box margin={2}>
                        <Field
                          component={DatePicker}
                          name="date"
                          label="Erledigt bis:"
                        />
                      </Box>
                      <Box margin={2}>
                        <FormControlLabel
                          control={
                            <Field
                              component={Switch}
                              type="checkbox"
                              color="primary"
                              name="rememberMe"
                            />
                          }
                          label="Erinnerung?"
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
                        variant="contained"
                        color="secondary"
                        onClick={props.onDelete}
                      >
                        Löschen
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
