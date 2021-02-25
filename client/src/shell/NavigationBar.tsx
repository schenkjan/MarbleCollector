import { BottomNavigation, BottomNavigationAction, makeStyles } from "@material-ui/core";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
//import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'; // TODO js (25.02.2021): Alternative icon for rewards.
import RedeemIcon from '@material-ui/icons/Redeem';

const useStyles = makeStyles({
    navigation: {
        backgroundColor: "#01579b", // TODO js (25.02.2021): Move color selection to theme?
        color: "#fff", // TODO js (25.02.2021): Move color selection to theme?
    },
    action: {
        color: "#fff", // TODO js (25.02.2021): Move color selection to theme?
    },
    icon: {
        color: "#fff", // TODO js (25.02.2021): Move color selection to theme?
    }
});

export function NavigationBar() {
    const classes = useStyles();

    return (
        <BottomNavigation className={classes.navigation} showLabels>
            <BottomNavigationAction className={classes.action} label="Ämtli" icon={<AssignmentIcon className={classes.icon} />} />
            <BottomNavigationAction className={classes.action} label="Belohnungen" icon={<RedeemIcon className={classes.icon} />} />
            <BottomNavigationAction className={classes.action} label="Profil" icon={<AssignmentIndIcon className={classes.icon} />} />
        </BottomNavigation>
    );
}