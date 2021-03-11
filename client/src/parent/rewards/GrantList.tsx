import { Grant } from "../models/Grant";

type Prop = {
  grants: Grant[];
};

export function GrantList(props: Prop): JSX.Element {
  return <p>Grant List</p>;
}
