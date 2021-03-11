import { CardContent, Collapse } from "@material-ui/core";
import { ReactNode } from "react";

type Prop = {
  className?: string;
  children: ReactNode;
  expanded: boolean;
};

export function CollapsibleCardContent(props: Prop): JSX.Element {
  return (
    <Collapse in={props.expanded} timeout="auto" unmountOnExit>
      <CardContent className={props.className}>{props.children}</CardContent>
    </Collapse>
  );
}
