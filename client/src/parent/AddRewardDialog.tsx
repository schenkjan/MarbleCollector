import { Grid, Button, FormControlLabel, Dialog, DialogContent, DialogContentText } from "@material-ui/core";
import * as React from 'react';
import {Formik, Form, Field} from 'formik';
import MuiTextField from '@material-ui/core/TextField';
import { fieldToTextField, TextFieldProps } from 'formik-material-ui';
import Box from '@material-ui/core/Box';

import { RewardValidation } from "../model/RewardValidation";


type Prop = {
    open: boolean;
    onCancel: () => void;
    onDelete: () => void;
    onSave: () => void;
};


function RewardTextField(props: TextFieldProps) {
    const {
      form: {setFieldValue},
      field: {name},
    } = props;
    const onChange = React.useCallback(
      (event) => {
        const {value} = event.target;
        setFieldValue(name, value);
      },
      [setFieldValue, name]
    );
    return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}
  
const cancelForm = () => {
    alert("Erfassung abgebrochen -> put here the parent Dashboard link, for canceling reward creating");
}


export function AddChoreDialog(props: Prop) {
    return (
        <Dialog open={props.open}>
            <DialogContent>
                <DialogContentText>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
                        <Grid item>
                            <Formik
                                // init for the complete Formik-Component --> (GET-method in edit szenario)







                                initialValues={{
                                rewardName: 'Disneyland (1d)',
                                rewardValue: 500,
                                childSelect: true,
                                childSelect2: false,
                                }}

                                // validating for the complete Formik-Component
                                validate={(RewardValidation) => {
                                const errors: Partial<RewardValidation> = {};
                                if (!RewardValidation.rewardName) {
                                    errors.rewardName = 'Bitte definieren';
                                } else if (!RewardValidation.rewardValue) {
                                    errors.rewardValue = 'Bitte definieren';
                                } else if (RewardValidation.rewardValue < 1) {
                                    errors.rewardValue = 'Einfach gratis?';
                                }
                                return errors;
                                }}

                                // submit-function for the complete Formik-Component
                                onSubmit={(RewardValidation, {setSubmitting}) => {
                                setSubmitting(false);
                                alert(JSON.stringify(RewardValidation, null, 2));
                                // programming below the POST-method for the backend
                                // (in edit szenario --> PUT-method)





                                //
                                }}
                            >
                                {({submitForm, isSubmitting}) => (
                                <Form>
                                    <Box margin={2}>
                                        <Field
                                            component={RewardTextField}
                                            name="rewardName"
                                            type="text"
                                            label="Belohnungsbezeichnung"
                                        />
                                    </Box>
                                    <Box margin={2}>
                                        <Field
                                            component={RewardTextField}
                                            name="rewardValue"
                                            type="number"
                                            label="Wert in Murmeln"
                                        />
                                    </Box>
                                    <Box margin={3}>
                                        <FormControlLabel
                                            control={
                                            <Field type="checkbox" name="childSelect" />
                                            }
                                            label="Peter"
                                        />
                                        <br/>
                                        <FormControlLabel
                                            control={
                                            <Field type="checkbox" name="childSelect2" />
                                            }
                                            label="Margret"
                                        />
                                    </Box>
                                    <Box margin={2}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubmitting}
                                            onClick={submitForm}
                                        >
                                            Bestätigen
                                        </Button>
                                    </Box>
                                    <Box margin={2}>
                                        <Button
                                            variant="outlined"
                                            color="primary" 
                                            disabled={isSubmitting}
                                            onClick={cancelForm}
                                        >
                                            Abbrechen
                                        </Button>
                                    </Box>
                                </Form>
                                )}
                            </Formik>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={props.onSave}>Speichern</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={props.onDelete}>Löschen</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary" onClick={props.onCancel}>Abbrechen</Button>
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
} 