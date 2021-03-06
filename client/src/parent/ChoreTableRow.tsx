import { TableRow, TableCell, makeStyles } from "@material-ui/core";
import { ChoreAssignment } from "./ChoreAssignment";
import { ChoreDetails } from "./ChoreDetails";
import { ChoreWithAssignments } from "./models/ChoreWithAssignments";

const useStyles = makeStyles({
  row: {
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

  return (
    <>
      <TableRow className={classes.row} key={props.chore.id}>
        <TableCell component="th" scope="row" colSpan={4}>
          <ChoreDetails chore={props.chore} />
        </TableCell>
      </TableRow>
      {props.chore.assignments.map((assignment, index) => {
        return (
          <ChoreAssignment
            assignment={assignment}
            isLastRow={index === props.chore.assignments.length - 1}
          />
        );
      })}
    </>
  );
}
