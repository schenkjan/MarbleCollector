import React, { ReactNode } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { DashboardState } from "./DashboardState";
import { NavigationBar } from "./navigation/NavigationBar";
import { ShowSnack } from "./Snackbar";
import { TitleBar } from "./title/TitleBar";

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
  const userIsAuthenticated = useRecoilValue(AppState.userIsAuthenticated);

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
        userIsAuthenticated={userIsAuthenticated}
        title={dashboardTitle}
      />
      <div className={classes.children}>{props.children}</div>
      <NavigationBar showNavigationBar={userIsAuthenticated} />
      <ShowSnack />
    </Box>
  );
}
