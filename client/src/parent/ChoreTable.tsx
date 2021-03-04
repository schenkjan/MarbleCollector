import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { ChoreTableRow } from "./ChoreTableRow";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { ChoreWithAssignments } from "./models/ChoreWithAssignments";
import { AssignmentState } from "./models/AssignmentState";

// TODO js (25.02.2021): Remove dummy data as soon as data is consumed from backend.
const lars = {
  id: 1,
  name: "Lars",
  avatarSrc: "",
};
const lara = {
  id: 2,
  name: "Lara",
  avatarSrc: "",
};
const lena = {
  id: 3,
  name: "Lena",
  avatarSrc: "",
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flex: "1 1 auto",
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(6),
      right: theme.spacing(2),
    },
  })
);

export function ChoreTable() {
  const [chores, setChores] = useState<ChoreWithAssignments[]>([]);
  const classes = useStyles();

  useEffect(() => {
    setChores([
      // TODO js (25.02.2021): Remove dummy data as soon as data is consumed from backend.
      {
        id: 42,
        name: "Rasen mähen",
        description: "",
        dueDate: new Date(Date.now()),
        value: 20,
        assignments: [
          {
            id: 1,
            state: AssignmentState.RequestedToCheck,
            userId: lara.id,
            userName: lara.name,
            choreId: 42,
          },
        ],
      },
      {
        id: 1,
        name: "Zimmer staubsaugen",
        description: "",
        dueDate: new Date(Date.now()),
        value: 10,
        assignments: [
          {
            id: 2,
            state: AssignmentState.Assigned,
            userId: lars.id,
            userName: lars.name,
            choreId: 1,
          },
          {
            id: 3,
            state: AssignmentState.RequestedToCheck,
            userId: lara.id,
            userName: lara.name,
            choreId: 1,
          },
          {
            id: 4,
            state: AssignmentState.CheckConfirmed,
            userId: lena.id,
            userName: lena.name,
            choreId: 1,
          },
        ],
      },
      {
        id: 2,
        name: "Abfall rausbringen",
        description: "",
        dueDate: new Date(Date.now()),
        value: 5,
        assignments: [
          {
            id: 5,
            state: AssignmentState.RequestedToCheck,
            userId: lena.id,
            userName: lena.name,
            choreId: 2,
          },
          {
            id: 6,
            state: AssignmentState.Assigned,
            userId: lara.id,
            userName: lara.name,
            choreId: 2,
          },
        ],
      },
      {
        id: 3,
        name: "Abwaschen",
        description: "",
        dueDate: new Date(Date.now()),
        value: 5,
        assignments: [
          {
            id: 7,
            state: AssignmentState.RequestedToCheck,
            userId: lars.id,
            userName: lars.name,
            choreId: 3,
          },
          {
            id: 8,
            state: AssignmentState.Assigned,
            userId: lara.id,
            userName: lara.name,
            choreId: 3,
          },
        ],
      },
      {
        id: 4,
        name: "Zimmer aufräumen",
        description: "",
        dueDate: new Date(Date.now()),
        value: 10,
        assignments: [
          {
            id: 9,
            state: AssignmentState.Active,
            userId: lars.id,
            userName: lars.name,
            choreId: 4,
          },
          {
            id: 10,
            state: AssignmentState.RequestedToCheck,
            userId: lara.id,
            userName: lara.name,
            choreId: 4,
          },
          {
            id: 11,
            state: AssignmentState.Archived,
            userId: lena.id,
            userName: lena.name,
            choreId: 4,
          },
        ],
      },
    ]);
  }, []);

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table stickyHeader aria-label="sticky table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ämtli</TableCell>
            <TableCell></TableCell>
            <TableCell align="center">Done</TableCell>
            <TableCell align="center">Bestätigen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chores.map((chore) => (
            <ChoreTableRow key={chore.id} chore={chore} />
          ))}
        </TableBody>
      </Table>
      <Fab
        className={classes.fab}
        size="small"
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </TableContainer>
  );
}
