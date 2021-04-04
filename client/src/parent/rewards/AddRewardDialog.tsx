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
import Box from "@material-ui/core/Box";
import { AddRewardValidation } from "../models/AddRewardValidation";
import { RewardWithGrants } from "../models/RewardWithGrants";

type Prop = {
  open: boolean;
  reward?: RewardWithGrants;
  onCancel: () => void;
  onSave: (reward: RewardWithGrants) => void;
};

function RewardTextField(props: TextFieldProps) {
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

export function AddRewardDialog(props: Prop) {
  return (
    <Dialog open={props.open}>
      <DialogContent>
        <DialogContentText>
          <Formik
            // init for the complete Formik-Component --> (GET-method in edit szenario)

            initialValues={{
              id: props.reward ? props.reward.id : 0,
              name: props.reward ? props.reward.name : "",
              description: props.reward ? props.reward.description : "",
              value: props.reward ? props.reward.value : 100,
              grants: props.reward ? props.reward.grants : [],
            }}
            // validating for the complete Formik-Component
            validate={(RewardValidation) => {
              const errors: Partial<AddRewardValidation> = {};
              if (!RewardValidation.name) {
                errors.name = "Bitte definieren";
              } else if (!RewardValidation.value) {
                errors.value = "Bitte definieren";
              } else if (RewardValidation.value < 1) {
                errors.value = "Einfach gratis?";
              } else if (RewardValidation.value > 999) {
                errors.value = "Sei doch gnädig mit den Kindern";
              }
              return errors;
            }}
            // submit-function for the complete Formik-Component
            onSubmit={(RewardValidation) => {
              props.onSave(RewardValidation);
            }}
          >
            {({ submitForm }) => (
              <Form>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <Typography>Was gibt es zu kaufen?</Typography>
                    <Box margin={2}>
                      <Field
                        inputProps={{ maxLength: 50 }}
                        component={RewardTextField}
                        name="name"
                        type="text"
                        label="Belohnungsname"
                      />
                    </Box>
                    <Box margin={2}>
                      <Field
                        inputProps={{ maxLength: 250 }}
                        component={RewardTextField}
                        multiline
                        rows={3}
                        name="description"
                        type="text"
                        label="Belohnungsbeschreibung"
                      />
                    </Box>
                    <Box margin={2}>
                      <Field
                        component={RewardTextField}
                        name="value"
                        type="number"
                        label="Wert in Murmeln"
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
            )}
          </Formik>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
