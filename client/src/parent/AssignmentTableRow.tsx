import { Chip, TableRow, TableCell } from "@material-ui/core";
import { Key } from "react";

type Prop = {
  className?: string | undefined;
  key: Key | null | undefined;
  nameLabel?: string;
  stateLabel?: string;
  showConfirm?: boolean;
};

export function AssignmentTableRow(props: Prop) {
  return (
    <TableRow key={props.key} className={props.className}>
      <TableCell component="th" scope="row"></TableCell>
      <TableCell align="left">{props.nameLabel}</TableCell>
      <TableCell align="left">
        <Chip variant="outlined" label={props.stateLabel} />
      </TableCell>
      <TableCell align="right">
        {props.showConfirm ? <Chip label="OK" color="primary" /> : ""}
      </TableCell>
    </TableRow>
  );
}
