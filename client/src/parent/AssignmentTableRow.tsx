import {
  Chip,
  TableRow,
  TableCell,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

type Prop = {
  className?: string | undefined;
  nameLabel?: string;
  stateLabel?: string;
  showConfirm?: boolean;
  isRemovable?: boolean;
  isAddable?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableCell: {
      padding: "6px 8px",
    },
    chip: {
      marginRight: theme.spacing(1),
    },
  })
);

export function AssignmentTableRow(props: Prop) {
  const classes = useStyles();

  return (
    <TableRow className={props.className}>
      <TableCell className={classes.tableCell} component="th" scope="row">
        {props.isAddable ? (
          <AddCircleIcon fontSize="small" color="primary" />
        ) : (
          ""
        )}
        {props.isRemovable ? (
          <RemoveCircleIcon fontSize="small" color="secondary" />
        ) : (
          ""
        )}
      </TableCell>
      <TableCell className={classes.tableCell} align="left">
        {props.nameLabel}
      </TableCell>
      <TableCell className={classes.tableCell} align="left">
        <Chip
          className={classes.chip}
          variant="outlined"
          label={props.stateLabel}
        />
        {props.showConfirm ? (
          <Chip className={classes.chip} label="OK" color="primary" />
        ) : (
          ""
        )}
      </TableCell>
    </TableRow>
  );
}
