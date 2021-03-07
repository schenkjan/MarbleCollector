import { Chip, TableRow, TableCell, makeStyles } from "@material-ui/core";
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

  function getChoreList(): JSX.Element[] {
    if (!props.chore.assignments?.length) {
      return [
        <TableRow key={props.chore.id}>
          <TableCell component="th" scope="row"></TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <Chip variant="outlined" label="keine Zuweisung" />
          </TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>,
      ];
    }

    return props.chore.assignments.map((assignment, index) => {
      return (
        <ChoreAssignment
          key={`${props.chore.id}-${index}`}
          assignment={assignment}
          isLastRow={index === props.chore.assignments.length - 1}
        />
      );
    });
  }

  return (
    <>
      <TableRow className={classes.row} key={props.chore.id}>
        <TableCell component="th" scope="row" colSpan={4}>
          <ChoreDetails chore={props.chore} />
        </TableCell>
      </TableRow>
      {getChoreList()}
    </>
  );
}
