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
import { RewardItem } from "./RewardItem";
import { useChildRewardGet } from "../BackendAccess";

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

export function ChildRewardList(): JSX.Element {
  const userId = useRecoilValue(AppState.userId);
  const classes = useStyles();
  useDashboardTitle("Belohnungen");

  const { data } = useChildRewardGet(userId);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Box className={classes.box} component={Paper}>
        <List>
          {data?.map((reward) => (
            <RewardItem key={reward.id} reward={reward} />
          ))}
        </List>
      </Box>
    </Container>
  );
}
