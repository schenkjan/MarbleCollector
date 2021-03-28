import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

//if the actuell request of react-query in loading we noticed that here
export default function BackdropOverlay() {
  const classes = useStyles();

  const queryState = useRecoilValue(AppState.queryStateInfo);

  //shows overlayd on top of the actuell screen, a loadingcirle
  return (
    <Backdrop className={classes.backdrop} open={queryState.open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
