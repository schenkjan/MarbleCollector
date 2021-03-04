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
import { ChoreTableRow } from "./ChoreTableRow";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { ChoreWithAssignments } from "./models/ChoreWithAssignments";
import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";

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

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

export function ChoreTable(): JSX.Element {
  const classes = useStyles();

  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const { isLoading, error, data } = useQuery("choreData", () =>
    axios.get<ChoreWithAssignments[]>(`${apiBaseUrl}/api/Chores/Assignments`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
  );

  if (isLoading) return <p>Loading...</p>; // TODO js (04.03.2021): Implement more sophisticated loading screen.

  if (error) return <p>{`An error has occurred: ${error}`}</p>; // TODO js (04.03.2021): Implement more sophisticated error screen.

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
          {data?.data.map((chore) => (
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
