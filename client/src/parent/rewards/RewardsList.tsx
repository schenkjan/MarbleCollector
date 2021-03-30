import {
  Box,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  List,
} from "@material-ui/core";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AddRewardDialog } from "./AddRewardDialog";
import { useEffect, useState } from "react";
import { RewardCard } from "./RewardCard";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { useMyNotificationsByNamePrefixWithHandle } from "../../notifications/NotificationHooks";
import { NotificationNames } from "../../notifications/NotificationNames";
import { useChildrenDataForUser } from "../BackendAccess";
import { RewardWithGrants } from "../models/RewardWithGrants";
import produce from "immer";
import {
  mutateReward,
  useParentRewardGet,
  useParentRewardPost,
} from "../../api/BackendAccess";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flex: "1 1 auto",
      padding: "1px",
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(9),
      right: theme.spacing(2),
      zIndex: 42, // Answer to the Ultimate Question of Life, The Universe, and Everything (https://www.google.com/search?q=the+answer+to+life+the+universe+and+everything)
    },
  })
);

export function RewardsList() {
  useDashboardTitle("Belohnungspinnwand");
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false);
  const [rewardToEdit, setRewardToEdit] = useState<RewardWithGrants>();
  const { data: rewards } = useParentRewardGet();
  const addReward = useParentRewardPost();
  const { children } = useChildrenDataForUser(); // TODO js (25.03.2021): Move to generic backend access file.

  const [
    newRewardNotifications,
    setRewardNotificationsHandled,
  ] = useMyNotificationsByNamePrefixWithHandle(NotificationNames.prefix.grant);

  useEffect(() => {
    if (newRewardNotifications.length > 0) {
      // TODO js (27.03.2021): How to trigger reload of single assignment/chore?
      for (const notification of newRewardNotifications) {
        console.log(
          "Triggering reload for entity with id",
          notification.targetEntityId
        );
      }
      setRewardNotificationsHandled(newRewardNotifications);
    }
  }, [newRewardNotifications, setRewardNotificationsHandled]);

  function handleOnCancel() {
    setRewardToEdit(undefined);
    setShowDialog(false);
  }

  function handleOnSave(reward: RewardWithGrants) {
    addReward.mutate(mutateReward(reward));
    setShowDialog(false);
  }

  function handleAddReward() {
    setShowDialog(true);
  }

  function handleCopyReward(reward: RewardWithGrants) {
    const rewardCopy = produce(reward, (draftReward: RewardWithGrants) => {
      draftReward.id = 0;
      draftReward.grants = [];
    });
    setRewardToEdit(rewardCopy);
    setShowDialog(true);
  }

  return (
    <Box className={classes.container} component={Paper}>
      <List>
        {rewards?.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            children={children}
            onCopyReward={handleCopyReward}
          />
        ))}
      </List>
      <Fab
        className={classes.fab}
        size="small"
        color="primary"
        aria-label="add"
        onClick={handleAddReward}
      >
        <AddIcon />
      </Fab>
      <AddRewardDialog
        open={showDialog}
        reward={rewardToEdit}
        onCancel={handleOnCancel}
        onSave={handleOnSave}
      />
    </Box>
  );
}
