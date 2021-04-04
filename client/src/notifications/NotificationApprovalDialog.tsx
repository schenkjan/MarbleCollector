import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type NotificationApprovalDialogProps = {
  open: boolean;
  onClose: (approve: boolean) => void;
};

export function NotificationApprovalDialog(
  props: NotificationApprovalDialogProps
) {

  return (
    <Dialog
      open={props.open}
      onClose={() => props.onClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Nutze Browser Benachrichtigungen?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Willst du Browser Benachrichtigungen für MarbleCollector zulassen?
          Falls ja klicke auf Bestätigen und erlaube die Anfrage des Browsers im
          Anschluss.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose(false)} color="primary">
          Ablehnen
        </Button>
        <Button onClick={() => props.onClose(true)} color="primary" autoFocus>
          Bestätigen
        </Button>
      </DialogActions>
    </Dialog>
  );
}
