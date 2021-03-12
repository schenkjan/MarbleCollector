import {
  Box,
  CircularProgress,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  List,
} from "@material-ui/core";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ErrorIcon from "@material-ui/icons/Error";
import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { AddRewardDialog } from "../AddRewardDialog";
import { useState } from "react";
import { RewardCard } from "./RewardCard";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { RewardWithGrants } from "../models/RewardWithGrants";

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

const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;

interface RewardLoadingData {
  isLoading: boolean;
  error: unknown;
  rewards: RewardWithGrants[];
}

function useParentRewardData(): RewardLoadingData {
  const bearerToken = useRecoilValue(AppState.userBearerToken);
  const { isLoading, error, data: rewards } = useQuery("parentRewardData", () =>
    axios
      .get<RewardWithGrants[]>(`${apiBaseUrl}/api/Rewards/Grants`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((data) => data?.data)
  );

  return { isLoading: isLoading, error: error, rewards: rewards ?? [] };
}

export function RewardsList() {
  useDashboardTitle("Belohnungspinnwand");
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false);
  const { isLoading, error, rewards } = useParentRewardData();

  function handleOnCancel() {
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct cancel logic.
  }

  function handleOnDelete() {
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct delete logic.
  }

  function handleOnSave() {
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct save logic.
  }

  function handleRewardChore() {
    setShowDialog(true);
  }

  if (isLoading)
    return (
      <Box>
        <p>Loading...</p>
        <CircularProgress />
      </Box>
    ); // TODO js (11.03.2021): Implement more sophisticated loading screen. Refactor to general loading screen/overlay?

  if (error)
    return (
      <Box>
        <ErrorIcon color="secondary" fontSize="large" />
        <p>{`An error has occurred: ${error}`}</p>
      </Box>
    ); // TODO js (11.03.2021): Implement more sophisticated error screen. Refactor to general error screen?

  return (
    <Box className={classes.container} component={Paper}>
      <List>
        {rewards?.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </List>
      <Fab
        className={classes.fab}
        size="small"
        color="primary"
        aria-label="add"
        onClick={handleRewardChore}
      >
        <AddIcon />
      </Fab>
      <AddRewardDialog
        open={showDialog}
        onCancel={handleOnCancel}
        onDelete={handleOnDelete}
        onSave={handleOnSave}
      />
    </Box>
  );
}
