import {
  Box,
  Button,
  createStyles,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  Popover,
  Theme,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

type Prop = {
  iconComponent: JSX.Element;
  label: string;
  disabled: boolean | undefined;
  onConfirm: () => void;
  onCancel: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      padding: theme.spacing(2),
    },
  })
);

export function ConfirmableMenuItem(props: Prop): JSX.Element {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLLIElement | null>(null);

  function handleClick(event: React.MouseEvent<HTMLLIElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleConfirm() {
    setAnchorEl(null);
    props.onConfirm();
  }

  function handleCancel() {
    setAnchorEl(null);
    props.onCancel();
  }

  return (
    <>
      <MenuItem onClick={handleClick} disabled={props.disabled}>
        <ListItemIcon>{props.iconComponent}</ListItemIcon>
        <ListItemText disableTypography>
          <Typography variant="body2">{props.label}</Typography>
        </ListItemText>
      </MenuItem>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCancel}
      >
        <Box display="flex" flexDirection="column" className={classes.box}>
          <Typography>{`${props.label}?`}</Typography>
          <Button variant="contained" color="secondary" onClick={handleConfirm}>
            Ok
          </Button>
          <Button variant="outlined" color="primary" onClick={handleCancel}>
            Abbruch
          </Button>
        </Box>
      </Popover>
    </>
  );
}
