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
import { useChildRewardGet, useUserBalance } from "../BackendAccess";

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
  const { isLoading, error, balance } = useUserBalance();

  //TODO 21037 improve implementation
  let userBalance = 0;
  if (balance) {
    userBalance = balance;
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Box className={classes.box} component={Paper}>
        {!data || data.length === 0 ? (
          <p>Keine Belohnungen vorhanden.</p>
        ) : (
          <List>
            {data?.map((reward) => (
              <RewardItem
                key={reward.id}
                reward={reward}
                balance={userBalance}
              />
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}
