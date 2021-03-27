import {
  Box,
  Container,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  List,
} from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { ChoreItem } from "./ChoreItem";
import { useChildChoreGet } from "../BackendAccess";
import React, { useEffect } from "react";
import { ConfettiProps } from "../types/ConfettiProps";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      flex: "1 1 auto",
      padding: "1px",
    },
    container: {
      padding: "0px",
    },
  })
);

//some default values for IPhone 6/7/8 Plus
let confettiProps: ConfettiProps = {
  size: {
    width: 414,
    height: 918,
  },
};

let surroundingElementRef: any = React.createRef();

export function ChildChoreList(): JSX.Element {
  const userId = useRecoilValue(AppState.userId);
  const classes = useStyles();
  useDashboardTitle("Ämtli");

  useEffect(() => {
    confettiProps.size.width = surroundingElementRef.current.offsetWidth - 1; // 210227 hs -1 quickfix to prevent horizontal slidebar after Confetti Rain
    confettiProps.size.height = surroundingElementRef.current.offsetHeight;
  });

  const { data } = useChildChoreGet(userId);

  let itemCount = data?.length;

  return (
    <Container maxWidth="md" className={classes.container}>
      <div ref={surroundingElementRef}>
        <Box className={classes.box} component={Paper}>
          <List>
            {data?.map((chore) => (
              <ChoreItem
                key={chore.id}
                chore={chore}
                itemCount={itemCount}
                size={confettiProps}
              />
            ))}
          </List>
        </Box>
      </div>
    </Container>
  );
}
