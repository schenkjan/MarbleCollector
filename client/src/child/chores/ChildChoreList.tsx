import { ListItemComponent } from "../ListItemComponent";
import { ChildListItem } from "../types/ChildListItem";
import { StepperControl } from "../types/StepperControl";
import { AssignmentState } from "../../parent/models/AssignmentState";
import { useState } from "react";
import {
  Box,
  Container,
  CircularProgress,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  List,
} from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { useQuery } from "react-query";
import axios from "axios";
import ErrorIcon from "@material-ui/icons/Error";
import { ChoreWithAssignments } from "../../model/ChoreWithAssignments";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { ChoreItem } from "./ChoreItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      flex: "1 1 auto",
      padding: "1px",
    },
  })
);

export function ChildChoreList(): JSX.Element {
  const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const userId = useRecoilValue(AppState.userId);
  const classes = useStyles();
  const [chores, setChores] = useState<ChoreWithAssignments[]>([]);
  useDashboardTitle("Ämtli Pinnwand");

  const { isLoading, error } = useQuery("childChoreData", () =>
    axios
      .get<ChoreWithAssignments[]>(
        `${apiBaseUrl}/api/Chores/Assignments/Users/` + userId,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((data) => setChores(data?.data))
  );

  if (isLoading)
    return (
      <Box>
        <p>Loading...</p>
        <CircularProgress />
      </Box>
    ); // TODO js (04.03.2021): Implement more sophisticated loading screen. Refactor to general loading screen/overlay?

  if (error)
    return (
      <Box>
        <ErrorIcon color="secondary" fontSize="large" />
        <p>{`An error has occurred: ${error}`}</p>
      </Box>
    ); // TODO js (04.03.2021): Implement more sophisticated error screen. Refactor to general error screen?

  return (
    <Container maxWidth="md">
      <Box className={classes.box} component={Paper}>
        <List>
          {chores?.map((chore) => (
            <ChoreItem key={chore.id} chore={chore} />
          ))}
        </List>
      </Box>
    </Container>
  );
}
