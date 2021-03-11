import { CardContent, Collapse } from "@material-ui/core";
import { ReactNode } from "react";

type Prop = {
  children: ReactNode;
  expanded: boolean;
};

export function CollapsibleCardContent(props: Prop): JSX.Element {
  return (
    <Collapse in={props.expanded} timeout="auto" unmountOnExit>
      <CardContent>{props.children}</CardContent>
    </Collapse>
  );
}
