import { TableRow, TableCell, makeStyles } from "@material-ui/core";
import { AssignmentTableRow } from "./AssignmentTableRow";
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
        <AssignmentTableRow
          key={props.chore.id}
          stateLabel="keine Zuweisung"
          isAddable={true}
        />,
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
        <TableCell component="th" scope="row" colSpan={3}>
          <ChoreDetails chore={props.chore} />
        </TableCell>
      </TableRow>
      {getChoreList()}
    </>
  );
}
