import { Avatar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDashboardBasePath } from "./DashboardBasePathHook";

const useStyles = makeStyles((theme: Theme) => createStyles({
    toolbar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
    },
    avatar: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    },
    link: {
        textDecoration: "none",
    },
    title: {
        padding: "0px 16px 0px 16px",
    }
}));

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