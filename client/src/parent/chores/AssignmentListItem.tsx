import {
  Box,
  Chip,
  CircularProgress,
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
import { useDeleteAssignment } from "../BackendAccess";
import ErrorIcon from "@material-ui/icons/Error";
import { ConfirmRejectChip } from "../ConfirmRejectChip";

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
  const deleteAssignmentMutation = useDeleteAssignment();

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
    deleteAssignmentMutation.mutate(props.assignment.id);
  }

  function handleConfirmClick() {
    showInfo(`Confirming assignment for child '${props.assignment.userName}'.`); // TODO js (11.03.2021): Replace dummy implementation.
  }

  if (deleteAssignmentMutation.isLoading)
    return (
      <Box>
        <p>In progress...</p>
        <CircularProgress />
      </Box>
    ); // TODO js (16.03.2021): Implement more sophisticated loading screen. Refactor to general loading screen/overlay?

  if (deleteAssignmentMutation.isError)
    return (
      <Box>
        <ErrorIcon color="secondary" fontSize="large" />
        <p>{`An error has occurred: ${deleteAssignmentMutation.error}`}</p>
      </Box>
    ); // TODO js (16.03.2021): Implement more sophisticated error screen. Refactor to general error screen?

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
            <ConfirmRejectChip onClick={handleConfirmClick} />
          ) : (
            ""
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
