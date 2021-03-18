import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { User } from "./models/User";
import AddIcon from "@material-ui/icons/Add";

type Prop = {
  children: User[];
  open: boolean;
  anchorEl: HTMLElement | null;
  onChildSelected: (id: number) => void;
  onClose: () => void;
};

export function AddChildMenu(props: Prop): JSX.Element {
  function onItemClick(id: number) {
    props.onChildSelected(id);
  }

  return (
    <Menu
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
      keepMounted
    >
      {props.children.map((child) => {
        return (
          <MenuItem key={child.id} onClick={() => onItemClick(child.id)}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText disableTypography>
              <Typography variant="body2">{child.username}</Typography>
            </ListItemText>
          </MenuItem>
        );
      })}
    </Menu>
  );
}
