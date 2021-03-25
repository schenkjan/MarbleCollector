import {
  Box,
  Container,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  List,
} from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { ChoreItem } from "./ChoreItem";
import { useChildChoreGet } from "../BackendAccess";

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

  const { data } = useChildChoreGet(userId);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Box className={classes.box} component={Paper}>
        <List>
          {data?.map((chore) => (
            <ChoreItem key={chore.id} chore={chore} />
          ))}
        </List>
      </Box>
    </Container>
  );
}
