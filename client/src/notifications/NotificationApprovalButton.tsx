import React from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { IconButton } from "@material-ui/core";
import { NotificationApprovalDialog } from "./NotificationApprovalDialog";

export function NotificationApprovalButton() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  function handleOnClick() {
      setDialogOpen(open => !open);
  }

  function handleDialogClose(approval: boolean) {
    setDialogOpen(open => !open);
    if (approval) {
        Notification.requestPermission()
    }
  }

  return (
    <>
      <IconButton aria-label="notifications" onClick={handleOnClick}>
        <NotificationsIcon />
      </IconButton>
      <NotificationApprovalDialog open={dialogOpen} onClose={handleDialogClose} />
    </>
  );
}
