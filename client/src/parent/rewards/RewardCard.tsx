import { RewardWithGrants } from "../models/RewardWithGrants";
import { Avatar, Badge, Card } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { GrantState, isDone, isParentActionNeeded } from "../models/GrantState";
import { GrantList } from "./GrantList";
import { MoreOptionsMenu } from "../MoreOptionsMenu";
import { AddOptionsExpandCardActions } from "../AddOptionsExpandCardActions";
import { BiAvatarCardHeader } from "../BiAvatarCardHeader";
import { CollapsibleCardContent } from "../CollapsibleCardContent";
import { AddButtonWithLabel } from "../AddButtonWithLabel";
import { User } from "../models/User";
import { AddChildMenu } from "../AddChildMenu";
import { EditableText } from "../EditableText";
import * as Yup from "yup";
import { EditableTextAvatar } from "../EditableTextAvatar";
import {
  mutateGrantToCreate,
  mutateReward,
  useParentGrantPost,
  useParentRewardDelete,
  useParentRewardPut,
} from "../../api/BackendAccess";
import produce from "immer";

type Prop = {
  reward: RewardWithGrants;
  children: User[];
  onCopyReward: (rewardToCopy: RewardWithGrants) => void;
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
    actionNotificationBadge: {
      color: "white",
      backgroundColor: theme.palette.warning.light,
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
  const [allChildrenAssigned, setAllChildrenAssigned] = useState(true);
  const [cardLocked, setCardLocked] = useState(true);
  const addGrantMutation = useParentGrantPost();
  const deleteRewardMutation = useParentRewardDelete();
  const changeRewardMutation = useParentRewardPut();

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

    addGrantMutation.mutate(
      mutateGrantToCreate({ rewardId: props.reward.id, userId: id })
    );
  }

  function handleAddChildClose(): void {
    setShowAddChildAnchor(null);
    setShowAddChild(false);
  }

  function handleMoreClick(event: React.MouseEvent<HTMLButtonElement>) {
    setShowMoreAnchor(event.currentTarget);
    setShowMoreActions(true);
  }

  function handleMoreClose() {
    setShowMoreAnchor(null);
    setShowMoreActions(false);
  }

  function handleCopy() {
    handleMoreClose();
    props.onCopyReward(props.reward);
  }

  function handleDelete() {
    deleteRewardMutation.mutate(mutateReward(props.reward));
    handleMoreClose();
  }

  function handleTitleEdit(title: string) {
    var updatedReward = produce(
      props.reward,
      (draftReward: RewardWithGrants) => {
        draftReward.name = title;
      }
    );
    changeRewardMutation.mutate(mutateReward(updatedReward));
  }

  function handleValueEdit(value: number) {
    var updatedReward = produce(
      props.reward,
      (draftReward: RewardWithGrants) => {
        draftReward.value = value;
      }
    );
    changeRewardMutation.mutate(mutateReward(updatedReward));
  }

  function handleDescriptionEdit(description: string) {
    var updatedReward = produce(
      props.reward,
      (draftReward: RewardWithGrants) => {
        draftReward.description = description;
      }
    );
    changeRewardMutation.mutate(mutateReward(updatedReward));
  }

  function getTextColor(): "textSecondary" | "textPrimary" {
    return cardLocked ? "textSecondary" : "textPrimary";
  }

  return (
    <Card elevation={5}>
      <BiAvatarCardHeader
        leftAvatarComponent={
          <Badge
            classes={{ badge: classes.actionNotificationBadge }}
            badgeContent={
              props.reward.grants.filter((grant) =>
                isParentActionNeeded(grant.state)
              ).length
            }
            onClick={handleExpandClick}
          >
            <Avatar>{props.reward.grants.length.toString()}</Avatar>
          </Badge>
        }
        titleComponent={
          <EditableText
            text={props.reward.name}
            editable={!cardLocked}
            editLabel="Bezeichnung der Belohnung"
            validationSchema={Yup.object({
              text: Yup.string()
                .required("Bitte definieren")
                .max(50, "Maximum 50 Zeichen"),
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
                .min(1, "Wert > 0")
                .max(99, "Wert < 100"),
            })}
            notifications={
              props.reward.grants.filter((grant) => isDone(grant.state)).length
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
