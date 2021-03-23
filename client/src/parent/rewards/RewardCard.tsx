import { RewardWithGrants } from "../models/RewardWithGrants";
import { Avatar, Badge, Box, Card, CircularProgress } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { GrantState } from "../models/GrantState";
import { GrantList } from "./GrantList";
import { MoreOptionsMenu } from "../MoreOptionsMenu";
import { AddOptionsExpandCardActions } from "../AddOptionsExpandCardActions";
import { BiAvatarCardHeader } from "../BiAvatarCardHeader";
import { CollapsibleCardContent } from "../CollapsibleCardContent";
import { AddButtonWithLabel } from "../AddButtonWithLabel";
import { User } from "../models/User";
import { useInfoNotification } from "../../shell/hooks/SnackbarHooks";
import { AddChildMenu } from "../AddChildMenu";
import { useAddGrant } from "../BackendAccess";
import ErrorIcon from "@material-ui/icons/Error";
import { EditableText } from "../EditableText";
import * as Yup from "yup";
import { EditableTextAvatar } from "../EditableTextAvatar";

type Prop = {
  reward: RewardWithGrants;
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
    avatar: {
      backgroundColor: theme.palette.primary.main,
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
  const [showAddChild, setShowAddChild] = useState(false);
  const [
    showAddChildAnchor,
    setShowAddChildAnchor,
  ] = useState<null | HTMLElement>(null);
  const showInfo = useInfoNotification();
  const [allChildrenAssigned, setAllChildrenAssigned] = useState(true);
  const [cardLocked, setCardLocked] = useState(true);
  const addGrantMutation = useAddGrant();

  useEffect(() => {
    setAllChildrenAssigned(
      props.reward.grants.length === props.children.length
    );
  }, [props.children.length, props.reward.grants.length]);

  useEffect(() => {
    setCardLocked(
      props.reward.grants.filter((grant) => grant.state !== GrantState.Assigned)
        .length > 0
    );
  }, [props.reward.grants]);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handleAddChildClick(event: React.MouseEvent<HTMLButtonElement>) {
    setShowAddChildAnchor(event.currentTarget);
    setShowAddChild(true);
  }

  function handleSelectedChild(id: number): void {
    setShowAddChildAnchor(null);
    setShowAddChild(false);

    addGrantMutation.mutate({ rewardId: props.reward.id, userId: id });
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

  function handleValueEdit() {
    console.log("Editing amount of marbles...");
    showInfo("Editing amount of marbles..."); // TODO js (11.03.2021): Replace dummy implementation.
  }

  function handleDescriptionEdit(description: string) {
    console.log("Editing description...");
    showInfo("Editing description..."); // TODO js (23.03.2021): Replace dummy implementation.
  }

  if (addGrantMutation.isLoading)
    return (
      <Box>
        <p>In progress...</p>
        <CircularProgress />
      </Box>
    ); // TODO js (16.03.2021): Implement more sophisticated loading screen. Refactor to general loading screen/overlay?

  if (addGrantMutation.isError)
    return (
      <Box>
        <ErrorIcon color="secondary" fontSize="large" />
        <p>{`An error has occurred: ${addGrantMutation.error}`}</p>
      </Box>
    ); // TODO js (16.03.2021): Implement more sophisticated error screen. Refactor to general error screen?

  function getTextColor(): "textSecondary" | "textPrimary" {
    return cardLocked ? "textSecondary" : "textPrimary";
  }

  return (
    <Card elevation={5}>
      <BiAvatarCardHeader
        leftAvatarComponent={
          <Badge
            badgeContent={
              props.reward.grants.filter(
                (grant) => grant.state === GrantState.Requested
              ).length
            }
            color="secondary"
          >
            <Avatar className={classes.avatar} onClick={handleExpandClick}>
              {props.reward.grants.length.toString()}
            </Avatar>
          </Badge>
        }
        titleComponent={
          <EditableText
            text={props.reward.name}
            editable={!cardLocked}
            editLabel="Bezeichnung der Belohnung"
            validationSchema={Yup.object({
              text: Yup.string()
                .required("Bitte definieren") // TODO js (17.03.2021): Use parameter.
                .max(50, "Maximum 50 Zeichen"), // TODO js (17.03.2021): Use parameter.
            })}
            onTextChanged={handleTitleEdit}
            textColor={getTextColor()}
          />
        }
        rightAvatarComponent={
          <EditableTextAvatar
            value={props.reward.value}
            editable={!cardLocked}
            editLabel="Preis in Murmeln"
            validationSchema={Yup.object({
              value: Yup.number()
                .required("Bitte Wert definieren")
                .min(1, "Wert > 0"),
            })}
            notifications={
              props.reward.grants.filter(
                (grant) =>
                  grant.state === GrantState.RequestConfirmed ||
                  grant.state === GrantState.Archived
              ).length
            }
            onValueChanged={handleValueEdit}
          />
        }
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
        locked={cardLocked}
        lockMessage="Belohnung gesperrt, da bereits durch Kinder in angefordert."
        unlockMessage="Belohnung Titel, Murmelpreis und Beschreibung anpassbar."
      />
      <CollapsibleCardContent
        className={classes.cardContent}
        expanded={expanded}
      >
        <EditableText
          text={props.reward.description}
          editable={!cardLocked}
          editLabel="Beschreibung der Belohnung"
          validationSchema={Yup.object({
            text: Yup.string().max(250, "Maximum 250 Zeichen"),
          })}
          onTextChanged={handleDescriptionEdit}
          textColor={getTextColor()}
        />
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
      <AddChildMenu
        open={showAddChild}
        anchorEl={showAddChildAnchor}
        onClose={handleAddChildClose}
        children={props.children.filter(
          (child) =>
            !props.reward.grants.some((grant) => grant.userId === child.id)
        )}
        onChildSelected={handleSelectedChild}
      />
    </Card>
  );
}
