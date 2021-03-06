import { AssignmentState } from "./models/AssignmentState";
import {
  TableRow,
  TableCell,
  Checkbox,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Assignment } from "./models/Assignment";

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
    <TableRow
      className={!props.isLastRow ? classes.assignmentRow : ""}
      key={`${props.assignment.userId}`}
    >
      <TableCell component="th" scope="row"></TableCell>
      <TableCell align="left">{props.assignment.userName}</TableCell>
      <TableCell align="center">
        <Checkbox
          checked={isDone(props.assignment.state)}
          disabled
          size="small"
        />
      </TableCell>
      <TableCell align="center">
        {isDone(props.assignment.state) &&
        !isConfirmed(props.assignment.state) ? (
          <Button variant="contained" color="primary" size="small">
            Ok
          </Button>
        ) : (
          ""
        )}
      </TableCell>
    </TableRow>
  );
}
