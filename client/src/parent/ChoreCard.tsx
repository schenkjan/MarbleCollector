import { ChoreWithAssignments } from "./models/ChoreWithAssignments";
import {
  Avatar,
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useState } from "react";
import clsx from "clsx";
import { AssignmentState } from "./models/AssignmentState";
import { AssignmentList } from "./AssignmentList";
import { useInfoNotification } from "../Snackbar";

type Prop = {
  chore: ChoreWithAssignments;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      textAlign: "left",
    },
    description: {
      textAlign: "left",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    moreOpen: {
      transform: "rotate(90deg)",
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

export function ChoreCard(props: Prop): JSX.Element {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [showMoreAnchor, setShowMoreAnchor] = useState<null | HTMLElement>(
    null
  );
  const showInfo = useInfoNotification();

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handleAddChildClick() {
    showInfo(`Adding child to chore '${props.chore.name}'.`); // TODO js (11.03.2021): Replace dummy implementation.
  }

  function handleMoreClick(event: React.MouseEvent<HTMLButtonElement>) {
    setShowMoreAnchor(event.currentTarget);
    setShowMoreActions(true);

    console.log("Opening more actions.");
  }

  function handleMoreClose() {
    setShowMoreAnchor(null);
    setShowMoreActions(false);

    console.log("Closing more actions.");
  }

  function handleCopy() {
    console.log("Copying...");
    showInfo("Copying..."); // TODO js (11.03.2021): Replace dummy implementation.

    handleMoreClose();
  }

  function handleDelete() {
    console.log("Deleting...");
    showInfo("Deleting..."); // TODO js (11.03.2021): Replace dummy implementation.

    handleMoreClose();
  }

  function getDescription() {
    if (!props.chore.description) return;

    return (
      <Typography
        className={classes.description}
        variant="body2"
        color="textSecondary"
        component="p"
      >
        {props.chore.description}
      </Typography>
    );
  }

  return (
    <Card elevation={5}>
      <CardHeader
        className={classes.header}
        avatar={
          <Badge
            badgeContent={
              props.chore.assignments.filter(
                (assignment) =>
                  assignment.state === AssignmentState.RequestedToCheck
              ).length
            }
            color="secondary"
          >
            <Avatar
              aria-label="chore title"
              className={classes.avatar}
              onClick={handleExpandClick}
            >
              {props.chore.assignments.length}
            </Avatar>
          </Badge>
        }
        title={props.chore.name}
        action={
          <Badge
            badgeContent={
              props.chore.assignments.filter(
                (assignment) =>
                  assignment.state === AssignmentState.CheckConfirmed ||
                  assignment.state === AssignmentState.Archived
              ).length
            }
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            color="primary"
          >
            <Avatar>{props.chore.value}</Avatar>
          </Badge>
        }
        subheader={new Date(props.chore.dueDate).toLocaleDateString("de-DE", {
          weekday: "short",
          year: "2-digit",
          month: "short",
          day: "numeric",
        })}
      />
      <CardActions>
        <IconButton size="small" color="primary" onClick={handleAddChildClick}>
          <AddCircleIcon />
        </IconButton>
        <Typography variant="body2">Kind hinzufügen</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.moreOpen]: showMoreActions,
          })}
          onClick={handleMoreClick}
          size="small"
        >
          <MoreHorizIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          size="small"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {getDescription()}
          <AssignmentList assignments={props.chore.assignments} />
        </CardContent>
      </Collapse>
      <Menu
        open={showMoreActions}
        onClose={handleMoreClose}
        anchorEl={showMoreAnchor}
        keepMounted
      >
        <MenuItem onClick={handleCopy}>
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText disableTypography>
            <Typography variant="body2">Ämtli kopieren</Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteForeverIcon />
          </ListItemIcon>
          <ListItemText disableTypography>
            <Typography variant="body2">Ämtli löschen</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
}
