import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { ConfirmableMenuItem } from "./ConfirmableMenuItem";

type Prop = {
  copyLabel: string;
  deleteLabel: string;
  disableDelete?: boolean;
  open: boolean;
  anchorEl: HTMLElement | null;
  onMoreClose: () => void;
  onCopy: () => void;
  onDelete: () => void;
};

export function MoreOptionsMenu(props: Prop): JSX.Element {
  return (
    <Menu
      open={props.open}
      onClose={props.onMoreClose}
      anchorEl={props.anchorEl}
      keepMounted
    >
      <MenuItem onClick={props.onCopy}>
        <ListItemIcon>
          <FileCopyIcon />
        </ListItemIcon>
        <ListItemText disableTypography>
          <Typography variant="body2">{props.copyLabel}</Typography>
        </ListItemText>
      </MenuItem>
      <ConfirmableMenuItem
        iconComponent={<DeleteForeverIcon />}
        label={props.deleteLabel}
        onConfirm={props.onDelete}
        onCancel={props.onMoreClose}
        disabled={props.disableDelete}
      />
    </Menu>
  );
}
