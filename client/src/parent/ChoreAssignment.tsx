import { AssignmentState } from "./models/AssignmentState";
import {
  TableRow,
  TableCell,
  Checkbox,
  makeStyles,
  Chip,
} from "@material-ui/core";
import { Assignment } from "./models/Assignment";
import { Key } from "react";

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
  key: Key | null | undefined;
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
      key={props.key}
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
      <TableCell align="right">
        {isDone(props.assignment.state) &&
        !isConfirmed(props.assignment.state) ? (
          <Chip label="OK" color="primary" />
        ) : (
          ""
        )}
      </TableCell>
    </TableRow>
  );
}
