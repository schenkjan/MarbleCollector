import { Box, makeStyles } from "@material-ui/core";
import { ReactNode } from "react";
import { NavigationBar } from "./NavigationBar";
import { TitleBar } from "./TitleBar";

const useStyles = makeStyles({
    boxRoot: {
        height: "100vh",
    }
});

type Props = {
    children: ReactNode
}

export function DashboardLayout(props: Props) {
    const classes = useStyles();

    return (
        <Box className={classes.boxRoot} display="flex" flexDirection="column" justifyContent="space-between">
            <TitleBar />
            {props.children}
            <NavigationBar />
        </Box>
    );
}