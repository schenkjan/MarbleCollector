import React, { ReactNode, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";

type Prop = {
  children: ReactNode;
};

const swipeDetectionMargin = 20;

export function SwipeNavigator(props: Prop): JSX.Element {
  const userRole = useRecoilValue(AppState.userRole);
  const { pathname: path } = useLocation();
  const [currentPage, setCurrentPage] = useState("chores");

  const history = useHistory();

  useEffect(() => {
    if (path.match(/(.*)rewards$/)) {
      setCurrentPage("rewards");
    } else if (path.match(/(.*)profile$/)) {
      setCurrentPage("profile");
    } else if (path.match(/(.*)chores$/)) {
      setCurrentPage("chores");
    } else {
      setCurrentPage("chores");
    }
  }, [path]);

  let xStart = 0;
  let yStart = 0;
  let xMoved = 0;
  let yMoved = 0;

  function navigateToPage(page: string) {
    history.push(`/app/${userRole.toLowerCase()}/${page}`);
  }

  function handleOnTouchStart(event: any) {
    if (event.touches.length !== 1) return;

    xStart = event.touches[0].clientX;
    yStart = event.touches[0].clientY;
  }

  function handleOnTouchMove(event: any) {
    if (event.touches.length !== 1) return;

    xMoved = event.touches[0].clientX - xStart;
    yMoved = event.touches[0].clientY - yStart;
  }

  function handleOnTouchEnd(event: any) {
    if (Math.abs(yMoved) > swipeDetectionMargin) {
      console.log(`No swipe detected. Too much vertical movement ${yMoved}.`);
      return;
    }

    if (Math.abs(xMoved) < swipeDetectionMargin) {
      console.log(
        `No swipe detected. Too little horizontal movement ${xMoved}.`
      );
      return;
    }

    if (xMoved > swipeDetectionMargin) {
      switch (currentPage) {
        case "chores":
          console.log("Cannot move further to the left.");
          return;

        case "rewards":
          navigateToPage("chores");
          return;

        case "profile":
          navigateToPage("rewards");
          return;

        default:
          console.log(`Unknown currentPage '${currentPage}'`);
          return;
      }
    }

    if (xMoved < -swipeDetectionMargin) {
      switch (currentPage) {
        case "chores":
          navigateToPage("rewards");
          return;

        case "rewards":
          navigateToPage("profile");
          return;

        case "profile":
          console.log("Cannot move further to the right.");
          return;

        default:
          console.log(`Unknown currentPage '${currentPage}'`);
          return;
      }
    }
  }

  return (
    <div
      onTouchStart={handleOnTouchStart}
      onTouchMove={handleOnTouchMove}
      onTouchEnd={handleOnTouchEnd}
    >
      {props.children}
    </div>
  );
}
