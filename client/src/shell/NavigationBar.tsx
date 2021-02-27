import { BottomNavigation, BottomNavigationAction, makeStyles } from "@material-ui/core";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
//import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'; // TODO js (25.02.2021): Alternative icon for rewards.
import RedeemIcon from '@material-ui/icons/Redeem';
import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDashboardBasePath } from "./DashboardBasePathHook";

const useStyles = makeStyles({
    navigation: {
        //backgroundColor: "#01579b", // TODO js (25.02.2021): Move color selection to theme?
        //color: "#fff", // TODO js (25.02.2021): Move color selection to theme?
    },
    action: {
        //color: "#fff", // TODO js (25.02.2021): Move color selection to theme?
    },
    icon: {
        //color: "#fff", // TODO js (25.02.2021): Move color selection to theme?
    }
});

export function NavigationBar() {
    const classes = useStyles();
    const [value, setValue] = useState<number>();
    const {path, } = useRouteMatch();
    const dashboardBasePath = useDashboardBasePath();

    useEffect(() => {
        if (path.match(/\/rewards/)) {
            setValue(1);
        } else if (path.match(/\/profile/)) {
            setValue(2);
        } else if (path.match(/\/chores/)) {
            setValue(0);
        } else {
            setValue(0);
        }
    }, [path]);

    function handleOnChange(event: React.ChangeEvent<{}>, newValue: any) {
        setValue(newValue);
    }

    return (
        <BottomNavigation 
            className={classes.navigation}
            value={value} 
            onChange={handleOnChange} 
            showLabels>
            <BottomNavigationAction 
                className={classes.action} 
                label="Ämtli" 
                icon={<AssignmentIcon className={classes.icon}/>}
                component={Link}
                to={`${dashboardBasePath}/chores`}
            />
            <BottomNavigationAction 
                className={classes.action} 
                label="Belohnungen" 
                icon={<RedeemIcon className={classes.icon} />}
                component={Link}
                to={`${dashboardBasePath}/rewards`}
            />
            <BottomNavigationAction 
                className={classes.action} 
                label="Profil" 
                icon={<AssignmentIndIcon className={classes.icon} />}
                component={Link}
                to={`${dashboardBasePath}/profile`}
            />
        </BottomNavigation>
    );
}