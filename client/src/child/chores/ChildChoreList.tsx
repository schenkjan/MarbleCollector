import { ChildChoreItem } from "./ChildChoreItem";
import { Chore } from "../models/Chore";
import {
  Box,
  CircularProgress,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  List,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flex: "1 1 auto",
      padding: "1px",
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(6),
      right: theme.spacing(2),
    },
  })
);

export function ChildChoreList(): JSX.Element {
  const classes = useStyles();

  const testChore: Chore = {
    id: 1,
    name: "Zimmer aufräumen",
    description: "Auch unter dem Bett",
    value: 11,
    dueDate: "2021-05-11",
  };
  return (
    <Box className={classes.container} component={Paper}>
      <List>
        <ChildChoreItem {...testChore}></ChildChoreItem>
        <ChildChoreItem {...testChore}></ChildChoreItem>
        <ChildChoreItem {...testChore}></ChildChoreItem>
      </List>
    </Box>
  );
}
