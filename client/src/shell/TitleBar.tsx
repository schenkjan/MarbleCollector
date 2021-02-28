import { Avatar, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import { useDashboardBasePath } from "./DashboardBasePathHook";

const useStyles = makeStyles({
    toolbar: {
        backgroundColor: "#01579b", // TODO js (25.02.2021): Move color selection to theme?
        color: "#fff", // TODO js (25.02.2021): Move color selection to theme?
    },
    avatar: {
        backgroundColor: "#fff", // TODO js (25.02.2021): Move color selection to theme?
        color: "#000", // TODO js (25.02.2021): Move color selection to theme?
    },
    link: {
        textDecoration: "none",
    },
    title: {
        padding: "0px 16px 0px 16px",
    }
});

type Prop = {
    avatarSrc: string;
    avatarAlt: string;
    title: string;
}

export function TitleBar(props: Prop) {
    const classes = useStyles();
    const dashboardBasePath = useDashboardBasePath();

    function getAvatar() {
        var matches = props.avatarAlt.match(/\b(\w)/g);
        var acronym = matches?.join('') ?? "?";
        
        if (props.avatarSrc) {
            return (
                <Link className={classes.link} to={`${dashboardBasePath}/profile`}>
                    <Avatar 
                        className={classes.avatar} 
                        alt={acronym} 
                        src={props.avatarSrc}
                    >
                        {acronym.toUpperCase()}
                    </Avatar>
                </Link>
            );
        }

        return (
            <Link className={classes.link} to={`${dashboardBasePath}/profile`}>
                <Avatar className={classes.avatar}>
                    {acronym.toUpperCase()}
                </Avatar>
            </Link>
        );
    }

    return (
        <Toolbar className={classes.toolbar}>
            {getAvatar()}
            <Typography className={classes.title} variant="h6">{props.title}</Typography>
            <IconButton />
        </Toolbar>
    );
}