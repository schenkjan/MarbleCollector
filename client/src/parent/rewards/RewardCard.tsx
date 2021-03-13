import { RewardWithGrants } from "../models/RewardWithGrants";
import { Card, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { GrantState } from "../models/GrantState";
import { GrantList } from "./GrantList";
import { useInfoNotification } from "../../Snackbar";
import { MoreOptionsMenu } from "../MoreOptionsMenu";
import { AddOptionsExpandCardActions } from "../AddOptionsExpandCardActions";
import { BiAvatarCardHeader } from "../BiAvatarCardHeader";
import { CollapsibleCardContent } from "../CollapsibleCardContent";
import { AddButtonWithLabel } from "../AddButtonWithLabel";
import { useChildren } from "../ParentState";

type Prop = {
  reward: RewardWithGrants;
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

export function RewardCard(props: Prop): JSX.Element {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [showMoreAnchor, setShowMoreAnchor] = useState<null | HTMLElement>(
    null
  );
  const showInfo = useInfoNotification();
  const children = useChildren();
  const [allChildrenAssigned] = useState(
    props.reward.grants.length === children.length
  );
  const [cardLocked] = useState(
    props.reward.grants.filter((grant) => grant.state !== GrantState.Assigned)
      .length > 0
  );

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handleAddChildClick() {
    showInfo(`Adding child to reward '${props.reward.name}'.`); // TODO js (11.03.2021): Replace dummy implementation.
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

  function handleValueEdit() {
    console.log("Editing amount of marbles...");
    showInfo("Editing amount of marbles..."); // TODO js (11.03.2021): Replace dummy implementation.
  }

  function getDescription() {
    if (!props.reward.description) return;

    return (
      <Typography
        className={classes.description}
        variant="body2"
        color="textSecondary"
        component="p"
      >
        {props.reward.description}
      </Typography>
    );
  }

  return (
    <Card elevation={5}>
      <BiAvatarCardHeader
        leftAvatarLabel={props.reward.grants.length.toString()}
        leftAvatarNotifications={
          props.reward.grants.filter(
            (grant) => grant.state === GrantState.Requested
          ).length
        }
        onLeftAvatarClick={handleExpandClick}
        title={props.reward.name}
        rightAvatarLabel={props.reward.value.toString()}
        rightAvatarNotifications={
          props.reward.grants.filter(
            (grant) =>
              grant.state === GrantState.RequestConfirmed ||
              grant.state === GrantState.Archived
          ).length
        }
        onRightAvatarClick={handleValueEdit}
        onTitleClick={handleTitleEdit}
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
        <GrantList grants={props.reward.grants} />
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
        copyLabel="Belohnung kopieren"
        onCopy={handleCopy}
        deleteLabel={"Belohnung löschen"}
        onDelete={handleDelete}
        disableDelete={cardLocked}
      />
    </Card>
  );
}
