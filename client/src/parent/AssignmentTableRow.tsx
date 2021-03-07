import {
  Chip,
  TableRow,
  TableCell,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";

type Prop = {
  className?: string | undefined;
  nameLabel?: string;
  stateLabel?: string;
  showConfirm?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginRight: theme.spacing(1),
    },
  })
);

export function AssignmentTableRow(props: Prop) {
  const classes = useStyles();

  return (
    <TableRow className={props.className}>
      <TableCell component="th" scope="row"></TableCell>
      <TableCell align="left">{props.nameLabel}</TableCell>
      <TableCell align="left">
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
      <TableCell align="right"></TableCell>
    </TableRow>
  );
}
