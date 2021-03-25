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
import { ConfirmRejectChip } from "../ConfirmRejectChip";
import produce from "immer";
import {
  mutateAssignment,
  useParentAssignmentDelete,
  useParentAssignmentPut,
} from "../../api/BackendAccess";

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
  const deleteAssignmentMutation = useParentAssignmentDelete();
  const updateAssignmentMutation = useParentAssignmentPut();

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
    deleteAssignmentMutation.mutate(mutateAssignment(props.assignment));
  }

  function handleConfirm() {
    const updatedAssignment = produce(props.assignment, (draftAssignment) => {
      draftAssignment.state = AssignmentState.CheckConfirmed;
    });
    updateAssignmentMutation.mutate(mutateAssignment(updatedAssignment));
  }

  function handleReject() {
    const updatedAssignment = produce(props.assignment, (draftAssignment) => {
      draftAssignment.state = AssignmentState.CheckRefused;
    });
    updateAssignmentMutation.mutate(mutateAssignment(updatedAssignment));
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
            <ConfirmRejectChip
              confirmLabel="Erledigt"
              rejectLabel="Nicht erledigt"
              onConfirm={handleConfirm}
              onReject={handleReject}
            />
          ) : (
            ""
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
