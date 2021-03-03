import { TableRow, TableCell, Checkbox, Button, makeStyles } from "@material-ui/core";
import { Chore } from "../model/Chore";

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
    chore: Chore
}

export function ChoreTableRow(props: Prop) {
    const classes = useStyles();

    return (
        <>
            <TableRow className={classes.row} key={props.chore.id}>
                <TableCell component="th" scope="row" colSpan={4}>
                    {props.chore.name}
                </TableCell>
            </TableRow>
            {props.chore.assignments.map((assignment, index) => {
                return (
                    <TableRow className={index !== props.chore.assignments.length - 1 ? classes.assignmentRow : ""} key={`${props.chore.id}${assignment.assignee.id}`} >
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell align="left">{assignment.assignee.name}</TableCell>
                        <TableCell align="center"><Checkbox checked={assignment.isDone} disabled size="small"/></TableCell>
                        <TableCell align="center">{assignment.isDone && !assignment.isConfirmed ? <Button variant="contained" color="primary" size="small">Ok</Button> : ""}</TableCell>
                    </TableRow>
                );
            })}
        </>
    );
}