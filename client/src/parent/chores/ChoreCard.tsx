import { ChoreWithAssignments } from "../models/ChoreWithAssignments";
import { Avatar, Badge, Card } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { AssignmentState } from "../models/AssignmentState";
import { AssignmentList } from "./AssignmentList";
import { MoreOptionsMenu } from "../MoreOptionsMenu";
import { AddOptionsExpandCardActions } from "../AddOptionsExpandCardActions";
import { BiAvatarCardHeader } from "../BiAvatarCardHeader";
import { CollapsibleCardContent } from "../CollapsibleCardContent";
import { AddButtonWithLabel } from "../AddButtonWithLabel";
import { User } from "../models/User";
import { AddChildMenu } from "../AddChildMenu";
import { EditableText } from "../EditableText";
import * as Yup from "yup";
import produce from "immer";
import { EditableDate } from "../EditableDate";
import { EditableTextAvatar } from "../EditableTextAvatar";
import {
  mutateAssignmentToCreate,
  mutateChore,
  useParentAssignmentPost,
  useParentChoreDelete,
  useParentChorePut,
} from "../../api/BackendAccess";

type Prop = {
  chore: ChoreWithAssignments;
  children: User[];
  onCopyChore: (choreToCopy: ChoreWithAssignments) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContent: {
      paddingTop: "0px",
      paddingBottom: "8px",
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
    actionNotificationBadge: {
      color: "white",
      backgroundColor: theme.palette.warning.light,
    },
  })
);

const yesterday = new Date(Date.now());
yesterday.setDate(yesterday.getDate() - 1);

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
  const [allChildrenAssigned, setAllChildrenAssigned] = useState(true);
  const [cardLocked, setCardLocked] = useState(true);
  const addAssignmentMutation = useParentAssignmentPost();
  const deleteChoreMutation = useParentChoreDelete();
  const changeChoreMutation = useParentChorePut();

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

    addAssignmentMutation.mutate(
      mutateAssignmentToCreate({ choreId: props.chore.id, userId: id })
    );
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
    handleMoreClose();
    props.onCopyChore(props.chore);
  }

  function handleDelete() {
    console.log("Deleting...");
    deleteChoreMutation.mutate(mutateChore(props.chore));
    handleMoreClose();
  }

  function handleTitleEdit(title: string) {
    console.log("Editing title...");
    var updatedChore = produce(
      props.chore,
      (draftChore: ChoreWithAssignments) => {
        draftChore.name = title;
      }
    );
    changeChoreMutation.mutate(mutateChore(updatedChore));
  }

  function handleDueDateEdit(date: Date) {
    console.log("Editing due date...");
    var updatedChore = produce(
      props.chore,
      (draftChore: ChoreWithAssignments) => {
        draftChore.dueDate = date;
      }
    );
    changeChoreMutation.mutate(mutateChore(updatedChore));
  }

  function handleValueEdit(value: number) {
    console.log("Editing amount of marbles...");
    var updatedChore = produce(
      props.chore,
      (draftChore: ChoreWithAssignments) => {
        draftChore.value = value;
      }
    );
    changeChoreMutation.mutate(mutateChore(updatedChore));
  }

  function handleDescriptionEdit(description: string) {
    console.log("Editing description...");
    var updatedChore = produce(
      props.chore,
      (draftChore: ChoreWithAssignments) => {
        draftChore.description = description;
      }
    );
    changeChoreMutation.mutate(mutateChore(updatedChore));
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
              props.chore.assignments.filter(
                (assignment) =>
                  assignment.state === AssignmentState.RequestedToCheck
              ).length
            }
            onClick={handleExpandClick}
          >
            <Avatar className={classes.avatar}>
              {props.chore.assignments.length.toString()}
            </Avatar>
          </Badge>
        }
        titleComponent={
          <EditableText
            text={props.chore.name}
            editable={!cardLocked}
            editLabel="Bezeichnung des Ämtlis"
            validationSchema={Yup.object({
              text: Yup.string()
                .required("Bitte definieren")
                .max(50, "Maximum 50 Zeichen"),
            })}
            onTextChanged={handleTitleEdit}
            textColor={getTextColor()}
          />
        }
        subtitleComponent={
          <EditableDate
            date={props.chore.dueDate}
            editable={!cardLocked}
            editLabel="Ablaufdatum"
            validationSchema={Yup.object({
              date: Yup.date().min(
                yesterday,
                "Ausgewählter Tag liegt in der Vergangenheit"
              ),
            })}
            onDateChanged={handleDueDateEdit}
            textColor={getTextColor()}
          />
        }
        rightAvatarComponent={
          <EditableTextAvatar
            value={props.chore.value}
            editable={!cardLocked}
            editLabel="Wert in Murmeln"
            validationSchema={Yup.object({
              value: Yup.number()
                .required("Bitte Wert definieren")
                .min(1, "Wert > 0"),
            })}
            notifications={
              props.chore.assignments.filter(
                (assignment) =>
                  assignment.state === AssignmentState.CheckConfirmed ||
                  assignment.state === AssignmentState.Archived
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
        lockMessage="Ämtli gesperrt, da bereits durch Kinder in Bearbeitung."
        unlockMessage="Ämtli Titel, Zeitpunkt, Murmelwert und Beschreibung anpassbar."
      />
      <CollapsibleCardContent
        className={classes.cardContent}
        expanded={expanded}
      >
        <EditableText
          text={props.chore.description}
          editable={!cardLocked}
          editLabel="Beschreibung des Ämtlis"
          validationSchema={Yup.object({
            text: Yup.string().max(250, "Maximum 250 Zeichen"),
          })}
          onTextChanged={handleDescriptionEdit}
          textColor={getTextColor()}
        />
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
