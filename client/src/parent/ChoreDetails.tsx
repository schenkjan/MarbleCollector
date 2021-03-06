import { ChoreWithAssignments } from "./models/ChoreWithAssignments";

type Prop = {
  chore: ChoreWithAssignments;
};

export function ChoreDetails(props: Prop) {
  return <>{props.chore.name}</>;
}
