import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
//import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'; // TODO js (25.02.2021): Alternative icon for rewards.
import RedeemIcon from "@material-ui/icons/Redeem";
import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { useDashboardBasePath } from "./hooks/DashboardBasePathHook";

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
  },
});

// TODO js (27.02.2021): Should we move the state handling code to a store file?
export const choreNewsCount = atom<number>({
  key: "choreNewsCount",
  default: 10, // TODO js 27.02.2021: Set correct value.
});

// TODO js (27.02.2021): Should we move the state handling code to a store file?
export const rewardNewsCount = atom<number>({
  key: "rewardNewsCount",
  default: 100, // TODO js 27.02.2021: Set correct value.
});

// TODO js (27.02.2021): Should we move the state handling code to a store file?
export const profileNewsCount = atom<number>({
  key: "profileNewsCount",
  default: 1, // TODO js 27.02.2021: Set correct value.
});

export function NavigationBar() {
  const classes = useStyles();
  const [value, setValue] = useState<number>();
  const { path } = useRouteMatch();
  const dashboardBasePath = useDashboardBasePath();
  const [choreNews, setChoreNews] = useRecoilState(choreNewsCount);
  const [rewardNews, setRewardNews] = useRecoilState(rewardNewsCount);
  const [profileNews, setProfileNews] = useRecoilState(profileNewsCount);

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

  // TODO js (27.02.2021): Consider to improve onClick handlers!
  return (
    <BottomNavigation
      className={classes.navigation}
      value={value}
      onChange={handleOnChange}
      showLabels
    >
      <BottomNavigationAction
        className={classes.action}
        label="Ämtli"
        icon={
          <Badge badgeContent={choreNews} color="secondary">
            <AssignmentIcon className={classes.icon} />
          </Badge>
        }
        component={Link}
        to={`${dashboardBasePath}/chores`}
        onClick={() => setChoreNews(0)}
      />
      <BottomNavigationAction
        className={classes.action}
        label="Belohnungen"
        icon={
          <Badge badgeContent={rewardNews} color="secondary">
            <RedeemIcon className={classes.icon} />
          </Badge>
        }
        component={Link}
        to={`${dashboardBasePath}/rewards`}
        onClick={() => setRewardNews(0)}
      />
      <BottomNavigationAction
        className={classes.action}
        label="Profil"
        icon={
          <Badge badgeContent={profileNews} color="secondary">
            <AssignmentIndIcon className={classes.icon} />
          </Badge>
        }
        component={Link}
        to={`${dashboardBasePath}/profile`}
        onClick={() => setProfileNews(0)}
      />
    </BottomNavigation>
  );
}
