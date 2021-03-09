import {
  Box,
  Chip,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  Grid,
} from "@material-ui/core";
import { Assignment } from "./models/Assignment";
import {
  AssignmentState,
  AssignmentStateNames,
} from "./models/AssignmentState";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

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
    console.log(
      `Removing assignment for child '${props.assignment.userName}'.`
    );
  }

  function handleConfirmClick() {
    console.log(
      `Confirming assignment for child '${props.assignment.userName}'.`
    );
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        {!isInprogress(props.assignment.state) ? (
          <RemoveCircleIcon color="secondary" onClick={handleRemoveClick} />
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
