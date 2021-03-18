import { ChoreWithAssignments } from "../models/ChoreWithAssignments";
import { Box, Card, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { AssignmentState } from "../models/AssignmentState";
import { AssignmentList } from "./AssignmentList";
import { MoreOptionsMenu } from "../MoreOptionsMenu";
import { AddOptionsExpandCardActions } from "../AddOptionsExpandCardActions";
import { BiAvatarCardHeader } from "../BiAvatarCardHeader";
import { CollapsibleCardContent } from "../CollapsibleCardContent";
import { AddButtonWithLabel } from "../AddButtonWithLabel";
import { User } from "../models/User";
import { useInfoNotification } from "../../shell/hooks/SnackbarHooks";
import { AddChildMenu } from "./AddChildMenu";
import { useAddAssignment } from "../BackendAccess";
import ErrorIcon from "@material-ui/icons/Error";

type Prop = {
  chore: ChoreWithAssignments;
  children: User[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      textAlign: "left",
    },
    cardContent: {
      paddingTop: "0px",
      paddingBottom: "8px",
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
  const [showAddChild, setShowAddChild] = useState(false);
  const [
    showAddChildAnchor,
    setShowAddChildAnchor,
  ] = useState<null | HTMLElement>(null);
  const showInfo = useInfoNotification();
  const [allChildrenAssigned, setAllChildrenAssigned] = useState(true);
  const [cardLocked, setCardLocked] = useState(true);
  const addAssignmentMutation = useAddAssignment();

  useEffect(() => {
    setAllChildrenAssigned(
      props.chore.assignments.length === props.children.length
    );
  }, [props.children.length, props.chore.assignments.length]);

  useEffect(() => {
    setCardLocked(
      props.chore.assignments.filter(
        (assignment) => assignment.state !== AssignmentState.Assigned
      ).length > 0
    );
  }, [props.chore.assignments]);

  function handleExpandClick() {
    setExpanded((prevExpanded) => !prevExpanded);
  }

  function handleAddChildClick(event: React.MouseEvent<HTMLButtonElement>) {
    setShowAddChildAnchor(event.currentTarget);
    setShowAddChild(true);
  }

  function handleSelectedChild(id: number): void {
    setShowAddChildAnchor(null);
    setShowAddChild(false);

    addAssignmentMutation.mutate({ choreId: props.chore.id, userId: id });
  }

  function handleAddChildClose(): void {
    setShowAddChildAnchor(null);
    setShowAddChild(false);
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

  function handleTitleEdit() {
    console.log("Editing title...");
    showInfo("Editing title..."); // TODO js (11.03.2021): Replace dummy implementation.
  }

  function handleDueDateEdit() {
    console.log("Editing due date...");
    showInfo("Editing due date..."); // TODO js (11.03.2021): Replace dummy implementation.
  }

  function handleValueEdit() {
    console.log("Editing amount of marbles...");
    showInfo("Editing amount of marbles..."); // TODO js (11.03.2021): Replace dummy implementation.
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

  if (addAssignmentMutation.isLoading)
    return (
      <Box>
        <p>In progress...</p>
        <CircularProgress />
      </Box>
    ); // TODO js (16.03.2021): Implement more sophisticated loading screen. Refactor to general loading screen/overlay?

  if (addAssignmentMutation.isError)
    return (
      <Box>
        <ErrorIcon color="secondary" fontSize="large" />
        <p>{`An error has occurred: ${addAssignmentMutation.error}`}</p>
      </Box>
    ); // TODO js (16.03.2021): Implement more sophisticated error screen. Refactor to general error screen?

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
        onRightAvatarClick={handleValueEdit}
        onTitleClick={handleTitleEdit}
        onSubtitleClick={handleDueDateEdit}
      />
      <AddOptionsExpandCardActions
        addLabel="Kind hinzufügen"
        moreOpen={showMoreActions}
        expandOpen={expanded}
        onAddClick={handleAddChildClick}
        onMoreClick={handleMoreClick}
        onExpandClick={handleExpandClick}
        hideAddButton
        disabledAddButton={allChildrenAssigned}
      />
      <CollapsibleCardContent
        className={classes.cardContent}
        expanded={expanded}
      >
        {getDescription()}
        <AssignmentList assignments={props.chore.assignments} />
        <AddButtonWithLabel
          title="Kind hinzufügen"
          onClick={handleAddChildClick}
          disabled={allChildrenAssigned}
        />
      </CollapsibleCardContent>
      <MoreOptionsMenu
        open={showMoreActions}
        anchorEl={showMoreAnchor}
        onMoreClose={handleMoreClose}
        copyLabel="Ämtli kopieren"
        onCopy={handleCopy}
        deleteLabel={"Ämtli löschen"}
        onDelete={handleDelete}
        disableDelete={cardLocked}
      />
      <AddChildMenu
        open={showAddChild}
        anchorEl={showAddChildAnchor}
        onClose={handleAddChildClose}
        children={props.children.filter(
          (child) =>
            !props.chore.assignments.some(
              (assignment) => assignment.userId === child.id
            )
        )}
        onChildSelected={handleSelectedChild}
      />
    </Card>
  );
}
