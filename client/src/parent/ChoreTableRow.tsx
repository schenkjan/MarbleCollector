import {
  TableRow,
  TableCell,
  Checkbox,
  Button,
  makeStyles,
} from "@material-ui/core";
import { ChoreDetails } from "./ChoreDetails";
import { AssignmentState } from "./models/AssignmentState";
import { ChoreWithAssignments } from "./models/ChoreWithAssignments";

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
  chore: ChoreWithAssignments;
};

export function ChoreTableRow(props: Prop) {
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
    <>
      <TableRow className={classes.row} key={props.chore.id}>
        <TableCell component="th" scope="row" colSpan={4}>
          <ChoreDetails chore={props.chore} />
        </TableCell>
      </TableRow>
      {props.chore.assignments.map((assignment, index) => {
        return (
          <TableRow
            className={
              index !== props.chore.assignments.length - 1
                ? classes.assignmentRow
                : ""
            }
            key={`${props.chore.id}${assignment.userId}`}
          >
            <TableCell component="th" scope="row"></TableCell>
            <TableCell align="left">{assignment.userName}</TableCell>
            <TableCell align="center">
              <Checkbox
                checked={isDone(assignment.state)}
                disabled
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              {isDone(assignment.state) && !isConfirmed(assignment.state) ? (
                <Button variant="contained" color="primary" size="small">
                  Ok
                </Button>
              ) : (
                ""
              )}
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
