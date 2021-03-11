import { Box, makeStyles } from "@material-ui/core";
import { ReactNode } from "react";
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
  title: string;
  avatarAlt: string;
  avatarSrc: string;
};

export function DashboardLayout(props: Props) {
  const classes = useStyles();

  return (
    <Box
      className={classes.boxRoot}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <TitleBar
        avatarAlt={props.avatarAlt}
        avatarSrc={props.avatarSrc}
        title={props.title}
      />
      <div className={classes.children}>{props.children}</div>
      <NavigationBar />
    </Box>
  );
}
