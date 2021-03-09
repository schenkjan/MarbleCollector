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
import { Chore } from "../model/Chore";
import { ChoreTableRow } from "./ChoreTableRow";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AddChoreDialog } from "./AddChoreDialog";
import { useRecoilState } from "recoil";
import { snackState } from "../AppState";

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
  const [chores, setChores] = useState<Chore[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [snack, setSnackState] = useRecoilState(snackState);
  const classes = useStyles();

  useEffect(() => {
    setChores([
      // TODO js (25.02.2021): Remove dummy data as soon as data is consumed from backend.
      {
        id: 42,
        name: "Rasen mähen",
        description: "",
        dueDate: Date.now(),
        value: 20,
        assignments: [
          {
            isDone: true,
            isConfirmed: false,
            assignee: lara,
          },
        ],
      },
      {
        id: 1,
        name: "Zimmer staubsaugen",
        description: "",
        dueDate: Date.now(),
        value: 10,
        assignments: [
          {
            isDone: false,
            isConfirmed: false,
            assignee: lars,
          },
          {
            isDone: true,
            isConfirmed: false,
            assignee: lara,
          },
          {
            isDone: true,
            isConfirmed: true,
            assignee: lena,
          },
        ],
      },
      {
        id: 2,
        name: "Abfall rausbringen",
        description: "",
        dueDate: Date.now(),
        value: 5,
        assignments: [
          {
            isDone: true,
            isConfirmed: false,
            assignee: lara,
          },
          {
            isDone: false,
            isConfirmed: false,
            assignee: lena,
          },
        ],
      },
      {
        id: 3,
        name: "Abwaschen",
        description: "",
        dueDate: Date.now(),
        value: 5,
        assignments: [
          {
            isDone: true,
            isConfirmed: false,
            assignee: lara,
          },
          {
            isDone: false,
            isConfirmed: false,
            assignee: lena,
          },
        ],
      },
      {
        id: 4,
        name: "Zimmer aufräumen",
        description: "",
        dueDate: Date.now(),
        value: 10,
        assignments: [
          {
            isDone: false,
            isConfirmed: false,
            assignee: lars,
          },
          {
            isDone: true,
            isConfirmed: false,
            assignee: lara,
          },
          {
            isDone: true,
            isConfirmed: true,
            assignee: lena,
          },
        ],
      },
    ]);
  }, []);

  function handleOnCancel() {
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct cancel logic.
    setSnackState({
      open: true,
      message: "abgebrochen",
      severity: "info",
    });
  }

  function handleOnDelete() {
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct delete logic.
    setSnackState({
      open: true,
      message: "Ämtli gelöscht",
      severity: "info",
    });
  }

  function handleOnSave(ChoreObject: {}) {
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct save logic.
    alert(JSON.stringify(ChoreObject, null, 2));
    setSnackState({
      open: true,
      message: "Ämtli erstellt",
      severity: "success",
    });
  }

  function handleAddChore() {
    setShowDialog(true);
  }

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
        onClick={handleAddChore}
      >
        <AddIcon />
      </Fab>
      <AddChoreDialog
        open={showDialog}
        onCancel={handleOnCancel}
        onDelete={handleOnDelete}
        onSave={handleOnSave}
      />
    </TableContainer>
  );
}
