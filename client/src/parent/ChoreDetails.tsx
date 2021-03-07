import {
  Box,
  Chip,
  createStyles,
  makeStyles,
  PropTypes,
  Theme,
} from "@material-ui/core";
import { ChoreWithAssignments } from "./models/ChoreWithAssignments";

type Prop = {
  chore: ChoreWithAssignments;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      listStyle: "none",
      margin: 0,
      paddingInlineStart: 0,
    },
    chip: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
  })
);

export function ChoreDetails(props: Prop) {
  const classes = useStyles();

  function getColor(): Exclude<PropTypes.Color, "inherit"> {
    const today = new Date(Date.now());

    if (new Date(props.chore.dueDate) < today) {
      return "secondary";
    }

    return "default";
  }

  return (
    <Box
      component="ul"
      display="flex"
      justifyContent="space-between"
      flexWrap="wrap"
      className={classes.box}
    >
      <li key="name">
        <Chip color="primary" label={props.chore.name} />
      </li>
      <li key="properties">
        <Box
          component="ul"
          display="flex"
          justifyContent="flex-end"
          className={classes.box}
        >
          <li key="dueDate">
            <Chip
              label={new Date(props.chore.dueDate).toLocaleDateString("de-DE", {
                weekday: "short",
                year: "2-digit",
                month: "short",
                day: "numeric",
              })}
              variant="outlined"
              className={classes.chip}
              color={getColor()}
            />
          </li>
          <li key="value">
            <Chip label={props.chore.value} className={classes.chip} />
          </li>
        </Box>
      </li>
    </Box>
  );
}
