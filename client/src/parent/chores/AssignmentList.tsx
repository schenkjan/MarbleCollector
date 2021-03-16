import { List } from "@material-ui/core";
import { AssignmentListItem } from "./AssignmentListItem";
import { Assignment } from "../models/Assignment";

type Prop = {
  assignments: Assignment[];
};

export function AssignmentList(props: Prop) {
  return (
    <List>
      {props.assignments.map((assignment) => (
        <AssignmentListItem assignment={assignment} key={assignment.id} />
      ))}
    </List>
  );
}
