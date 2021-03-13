import { Card, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { AssignmentState } from "./models/AssignmentState";
import { AssignmentList } from "./AssignmentList";
import { useInfoNotification } from "../Snackbar";
import { MoreOptionsMenu } from "./MoreOptionsMenu";
import { AddOptionsExpandCardActions } from "./AddOptionsExpandCardActions";
import { BiAvatarCardHeader } from "./BiAvatarCardHeader";
import { CollapsibleCardContent } from "./CollapsibleCardContent";
import { ChoreWithAssignments } from "./models/ChoreWithAssignments";

type Prop = {
  chore: ChoreWithAssignments;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      textAlign: "left",
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
      <BiAvatarCardHeader
        leftAvatarLabel={props.chore.assignments.length.toString()}
        leftAvatarNotifications={
          props.chore.assignments.filter(
            (assignment) =>
              assignment.state === AssignmentState.RequestedToCheck
          ).length
        }
        onLeftAvatarClick={handleExpandClick}
        title={props.chore.name}
        subtitle={new Date(props.chore.dueDate).toLocaleDateString("de-DE", {
          weekday: "short",
          year: "2-digit",
          month: "short",
          day: "numeric",
        })}
        rightAvatarLabel={props.chore.value.toString()}
        rightAvatarNotifications={
          props.chore.assignments.filter(
            (assignment) =>
              assignment.state === AssignmentState.CheckConfirmed ||
              assignment.state === AssignmentState.Archived
          ).length
        }
      />
      <AddOptionsExpandCardActions
        addLabel="Kind hinzufügen"
        moreOpen={showMoreActions}
        expandOpen={expanded}
        onAddClick={handleAddChildClick}
        onMoreClick={handleMoreClick}
        onExpandClick={handleExpandClick}
      />
      <CollapsibleCardContent expanded={expanded}>
        {getDescription()}
        <AssignmentList assignments={props.chore.assignments} />
      </CollapsibleCardContent>
      <MoreOptionsMenu
        open={showMoreActions}
        anchorEl={showMoreAnchor}
        onMoreClose={handleMoreClose}
        copyLabel="Ämtli kopieren"
        onCopy={handleCopy}
        deleteLabel={"Ämtli löschen"}
        onDelete={handleDelete}
      />
    </Card>
  );
}
