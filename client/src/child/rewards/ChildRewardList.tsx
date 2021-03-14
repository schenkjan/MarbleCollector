import { ChildRewardItem } from "./ChildRewardItem";
// import { ChildChoreItemExpand } from "./ChildChoreItemExpand";
import { useState } from "react";
import {
  Box,
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
import { RewardWithGrants } from "../../model/RewardWithGrants";
import { GrantState } from "../../model/GrantState";
import { Grant } from "../../parent/models/Grant";

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

export function ChildRewardList(): JSX.Element {
  const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const userId = useRecoilValue(AppState.userId);
  const classes = useStyles();
  const [rewards, setRewards] = useState<RewardWithGrants[]>([]);

  function updateState(reward: RewardWithGrants): void {
    setNextGrantState(reward);

    //Optimisitic UI :-)
    // TODO hs (210314): Do we want an optimistic or pessimistic UI?
    const updatedRewards = rewards.map((t) =>
      t.id !== reward.id ? t : reward
    );
    setRewards(updatedRewards);

    // TODO hs (210313): Implement Error handling and reset state in case of error
    axios
      .put<RewardWithGrants>(
        `${apiBaseUrl}/api/Grants/` + reward.id,
        reward.grants[0],
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((data) => console.log("update succesfull: ", data?.data));
  }

  function setNextGrantState(reward: RewardWithGrants) {
    if (reward.grants[0].state === GrantState.RequestRefused) {
      reward.grants[0].state = GrantState.Requested;
    } else {
      reward.grants[0].state++;
    }
  }

  const { isLoading, error } = useQuery("childGrantData", () =>
    axios
      .get<RewardWithGrants[]>(`${apiBaseUrl}/api/Grants/Users/` + userId, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((data) => setRewards(data?.data))
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
    <Box className={classes.container} component={Paper}>
      <List>
        {rewards?.map((reward) => (
          <ChildRewardItem
            key={reward.id}
            reward={reward}
            onUpdateState={updateState}
          />
        ))}
      </List>
    </Box>
  );
}
