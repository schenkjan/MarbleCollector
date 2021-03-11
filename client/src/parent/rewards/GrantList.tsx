import { List } from "@material-ui/core";
import { Grant } from "../models/Grant";
import { GrantListItem } from "./GrantListItem";

type Prop = {
  grants: Grant[];
};

export function GrantList(props: Prop): JSX.Element {
  return (
    <List>
      {props.grants.map((grant) => (
        <GrantListItem grant={grant} key={grant.id} />
      ))}
    </List>
  );
}
