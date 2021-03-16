import {
  Box,
  Chip,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  Grid,
} from "@material-ui/core";
import { Assignment } from "../models/Assignment";
import {
  AssignmentState,
  AssignmentStateNames,
} from "../models/AssignmentState";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { useInfoNotification } from "../../shell/hooks/SnackbarHooks";

type Prop = {
  assignment: Assignment;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginRight: theme.spacing(1),
    },
  })
);

export function AssignmentListItem(props: Prop) {
  const classes = useStyles();
  const showInfo = useInfoNotification();

  function isDone(state: AssignmentState): boolean {
    return (
      state === AssignmentState.RequestedToCheck ||
      state === AssignmentState.CheckConfirmed ||
      state === AssignmentState.CheckRefused ||
      state === AssignmentState.Archived
    );
  }

  function isConfirmed(state: AssignmentState): boolean {
    return (
      state === AssignmentState.CheckConfirmed ||
      state === AssignmentState.CheckRefused ||
      state === AssignmentState.Archived
    );
  }

  function isInprogress(state: AssignmentState): boolean {
    return state !== AssignmentState.Assigned;
  }

  function handleRemoveClick() {
    showInfo(`Removing assignment for child '${props.assignment.userName}'.`); // TODO js (11.03.2021): Replace dummy implementation.
  }

  function handleConfirmClick() {
    showInfo(`Confirming assignment for child '${props.assignment.userName}'.`); // TODO js (11.03.2021): Replace dummy implementation.
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        {!isInprogress(props.assignment.state) ? (
          <RemoveCircleIcon color="primary" onClick={handleRemoveClick} />
        ) : (
          ""
        )}
      </Grid>
      <Grid item xs={5}>
        <Typography align="left" variant="body2">
          {props.assignment.userName}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Box display="flex" justifyContent="flex-start" alignItems="top">
          <Chip
            className={classes.chip}
            variant="outlined"
            label={AssignmentStateNames[props.assignment.state]}
          />
          {isDone(props.assignment.state) &&
          !isConfirmed(props.assignment.state) ? (
            <Chip
              className={classes.chip}
              label="OK"
              color="primary"
              onClick={handleConfirmClick}
            />
          ) : (
            ""
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
