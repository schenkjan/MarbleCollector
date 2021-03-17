import {
  Chip,
  createStyles,
  makeStyles,
  Theme,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { useState } from "react";

type Prop = {
  confirmLabel: string;
  rejectLabel: string;
  onConfirm: () => void;
  onReject: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginRight: theme.spacing(1),
    },
  })
);

export function ConfirmRejectChip(props: Prop): JSX.Element {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleOkClick(event: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleConfirm() {
    handleClose();
    props.onConfirm();
  }

  function handleReject() {
    handleClose();
    props.onReject();
  }

  return (
    <>
      <Chip
        className={classes.chip}
        label="OK"
        color="primary"
        onClick={handleOkClick}
      />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleConfirm}>
          <ListItemIcon>
            <ThumbUpIcon />
          </ListItemIcon>
          <ListItemText disableTypography>
            <Typography variant="body2">{props.confirmLabel}</Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleReject}>
          <ListItemIcon>
            <ThumbDownIcon />
          </ListItemIcon>
          <ListItemText disableTypography>
            <Typography variant="body2">{props.rejectLabel}</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
