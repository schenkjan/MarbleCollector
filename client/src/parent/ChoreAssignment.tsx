import {
  AssignmentState,
  AssignmentStateNames,
} from "./models/AssignmentState";
import { makeStyles } from "@material-ui/core";
import { Assignment } from "./models/Assignment";
import { AssignmentTableRow } from "./AssignmentTableRow";

const useStyles = makeStyles({
  row: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  assignmentRow: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

type Prop = {
  assignment: Assignment;
  isLastRow: boolean;
};

export function ChoreAssignment(props: Prop) {
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

  return (
    <AssignmentTableRow
      className={!props.isLastRow ? classes.assignmentRow : ""}
      nameLabel={props.assignment.userName}
      stateLabel={AssignmentStateNames[props.assignment.state]}
      showConfirm={
        isDone(props.assignment.state) && !isConfirmed(props.assignment.state)
      }
    />
  );
}
