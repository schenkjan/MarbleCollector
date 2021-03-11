import { Box, makeStyles } from "@material-ui/core";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { DashboardState } from "./DashboardState";
import { NavigationBar } from "./NavigationBar";
import { TitleBar } from "./TitleBar";

const useStyles = makeStyles({
  boxRoot: {
    height: "100vh",
  },
  children: {
    flex: "1 1 auto",
    overflow: "auto",
  },
});

type Props = {
  children: ReactNode;
};

export function DashboardLayout(props: Props) {
  const classes = useStyles();

  const userAvatarInfo = useRecoilValue(AppState.userAvatarInfo);
  const dashboardTitle = useRecoilValue(DashboardState.dashboardTitle);

  return (
    <Box
      className={classes.boxRoot}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <TitleBar
        avatarAlt={userAvatarInfo.imgAlt}
        avatarSrc={userAvatarInfo.imgSrc}
        title={dashboardTitle}
      />
      <div className={classes.children}>{props.children}</div>
      <NavigationBar />
    </Box>
  );
}
