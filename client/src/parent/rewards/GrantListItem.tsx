import {
  Box,
  Chip,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  Grid,
} from "@material-ui/core";
import { Grant } from "../models/Grant";
import { GrantState, GrantStateNames } from "../models/GrantState";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { ConfirmRejectChip } from "../ConfirmRejectChip";
import produce from "immer";
import {
  mutateGrant,
  useParentGrantDelete,
  useParentGrantPut,
} from "../ParentBackendAccess";

type Prop = {
  grant: Grant;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginRight: theme.spacing(1),
    },
  })
);

export function GrantListItem(props: Prop): JSX.Element {
  const classes = useStyles();
  const deleteGrantMutation = useParentGrantDelete();
  const updateGrantMutation = useParentGrantPut();

  function isDone(state: GrantState): boolean {
    return (
      state === GrantState.Requested ||
      state === GrantState.RequestConfirmed ||
      state === GrantState.RequestRefused ||
      state === GrantState.Archived
    );
  }

  function isConfirmed(state: GrantState): boolean {
    return (
      state === GrantState.RequestConfirmed ||
      state === GrantState.RequestRefused ||
      state === GrantState.Archived
    );
  }

  function isInprogress(state: GrantState): boolean {
    return state !== GrantState.Assigned;
  }

  function handleRemoveClick() {
    deleteGrantMutation.mutate(mutateGrant(props.grant));
  }

  function handleConfirm() {
    const updatedGrant = produce(props.grant, (draftGrant) => {
      draftGrant.state = GrantState.RequestConfirmed;
    });
    updateGrantMutation.mutate(mutateGrant(updatedGrant));
  }

  function handleReject() {
    const updatedGrant = produce(props.grant, (draftGrant) => {
      draftGrant.state = GrantState.RequestRefused;
    });
    updateGrantMutation.mutate(mutateGrant(updatedGrant));
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        {!isInprogress(props.grant.state) ? (
          <RemoveCircleIcon color="primary" onClick={handleRemoveClick} />
        ) : (
          ""
        )}
      </Grid>
      <Grid item xs={5}>
        <Typography align="left" variant="body2">
          {props.grant.userName}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Box display="flex" justifyContent="flex-start" alignItems="top">
          <Chip
            className={classes.chip}
            variant="outlined"
            label={GrantStateNames[props.grant.state]}
          />
          {isDone(props.grant.state) && !isConfirmed(props.grant.state) ? (
            <ConfirmRejectChip
              confirmLabel="bestätigen"
              rejectLabel="ablehnen"
              onConfirm={handleConfirm}
              onReject={handleReject}
            />
          ) : (
            ""
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
