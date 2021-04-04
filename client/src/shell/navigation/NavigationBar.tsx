import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import RedeemIcon from "@material-ui/icons/Redeem";
import { useEffect, useState } from "react";
import { DashboardState } from "../DashboardState";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useDashboardBasePath } from "../hooks/DashboardBasePathHook";

const useStyles = makeStyles({
  navigation: {},
  action: {},
  icon: {},
});

type NavigationBarProps = {
  showNavigationBar: boolean;
};

export function NavigationBar(props: NavigationBarProps) {
  const classes = useStyles();
  const [value, setValue] = useState<number>();
  const { pathname: path } = useLocation();
  const dashboardBasePath = useDashboardBasePath();

  const [choreNotificationCount, resetChoreNotificationCount] = [
    useRecoilValue(DashboardState.choreNotificationCount),
    useResetRecoilState(DashboardState.choreNotificationCount),
  ];

  const [rewardNotificationCount, resetRewardNotificationCount] = [
    useRecoilValue(DashboardState.rewardNotificationCount),
    useResetRecoilState(DashboardState.rewardNotificationCount),
  ];

  const [profileNotificationCount, resetProfileNotificationCount] = [
    useRecoilValue(DashboardState.profileNotificationCount),
    useResetRecoilState(DashboardState.profileNotificationCount),
  ];

  useEffect(() => {
    if (path.match(/(.*)rewards$/)) {
      setValue(1);
    } else if (path.match(/(.*)profile(.*)$/)) {
      setValue(2);
    } else if (path.match(/(.*)chores$/)) {
      setValue(0);
    } else {
      setValue(0);
    }
  }, [path]);

  function handleOnChange(event: React.ChangeEvent<{}>, newValue: any) {
    setValue(newValue);
  }

  if (!props.showNavigationBar) return <></>;

  return (
    <>
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
            <Badge badgeContent={choreNotificationCount} color="secondary">
              <AssignmentIcon className={classes.icon} />
            </Badge>
          }
          component={Link}
          to={`${dashboardBasePath}/chores`}
          onClick={resetChoreNotificationCount}
        />
        <BottomNavigationAction
          className={classes.action}
          label="Belohnungen"
          icon={
            <Badge badgeContent={rewardNotificationCount} color="secondary">
              <RedeemIcon className={classes.icon} />
            </Badge>
          }
          component={Link}
          to={`${dashboardBasePath}/rewards`}
          onClick={resetRewardNotificationCount}
        />
        <BottomNavigationAction
          className={classes.action}
          label="Profil"
          icon={
            <Badge badgeContent={profileNotificationCount} color="secondary">
              <AssignmentIndIcon className={classes.icon} />
            </Badge>
          }
          component={Link}
          to={`${dashboardBasePath}/profile`}
          onClick={resetProfileNotificationCount}
        />
      </BottomNavigation>
    </>
  );
}
