import { Box } from "@material-ui/core";
import { ReactNode } from "react";
import { NavigationBar } from "./NavigationBar";
import { TitleBar } from "./TitleBar";

type Props = {
    children: ReactNode
}

export function DashboardLayout(props: Props) {
    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between">
            <TitleBar />
                {props.children}
            <NavigationBar />
        </Box>
    );
}