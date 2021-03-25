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
import ErrorIcon from "@material-ui/icons/Error";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { ChoreItem } from "./ChoreItem";
//todo, 210322 hs move backendaccess to common folder
import { useChildChoreData, useChildChoreGet } from "../BackendAccess";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      flex: "1 1 auto",
      padding: "1px",
    },
    container: {
      padding: "0px",
    },
  })
);

export function ChildChoreList(): JSX.Element {
  const userId = useRecoilValue(AppState.userId);
  const classes = useStyles();
  useDashboardTitle("Ämtli");

  //const { isLoading, error, chores } = useChildChoreData(userId);
  const { data } = useChildChoreGet(userId);

  // if (isLoading)
  //   return (
  //     <Box>
  //       <p>Loading...</p>
  //       <CircularProgress />
  //     </Box>
  //   ); // TODO js (04.03.2021): Implement more sophisticated loading screen. Refactor to general loading screen/overlay?

  // if (error)
  //   return (
  //     <Box>
  //       <ErrorIcon color="secondary" fontSize="large" />
  //       <p>{`An error has occurred: ${error}`}</p>
  //     </Box>
  //   ); // TODO js (04.03.2021): Implement more sophisticated error screen. Refactor to general error screen?

  return (
    <Container maxWidth="md" className={classes.container}>
      <Box className={classes.box} component={Paper}>
        {/* <List>
          {chores?.map((chore) => (
            <ChoreItem key={chore.id} chore={chore} />
          ))}
        </List> */}
        <List>
          {data?.map((chore) => (
            <ChoreItem key={chore.id} chore={chore} />
          ))}
        </List>
      </Box>
    </Container>
  );
}
