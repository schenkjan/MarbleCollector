import {
  Box,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  List,
} from "@material-ui/core";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AddChoreDialog } from "./AddChoreDialog";
import { useState } from "react";
import { ChoreCard } from "./ChoreCard";
import { ChoreWithAssignments } from "./models/ChoreWithAssignments";
import { useSingleChorePost, useParentChoreData } from "../api/BackendAccess";
import { queryUrl } from "../api/models/queryUrl";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppState } from "../AppState";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flex: "1 1 auto",
      padding: "1px",
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(6),
      right: theme.spacing(2),
    },
  })
);

export function ChoreList(): JSX.Element {
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false);
  const [singleChore, setSingleChore] = useState({});

  const { chores } = useParentChoreData();

  function handleOnCancel() {
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct cancel logic.
  }

  // const { mutate } = useSingleChorePost(singleChore);
  // console.log(mutate);

  useSingleChorePost(singleChore);

  function handleOnSave(choreObject: object) {
    // setSingleChore(JSON.stringify(choreObject, null, 2));
    setSingleChore({
      Id: 0,
      Name: "TestMarcel",
      Description: "Batman",
      Value: 100,
      DueDate: "2021-03-15T23:22:24.379Z",
    });
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct save logic.
  }

  function handleAddChore() {
    setShowDialog(true);
  }

  return (
    <Box className={classes.container} component={Paper}>
      <List>
        {chores?.map((chore) => (
          <ChoreCard key={chore.id} chore={chore} />
        ))}
      </List>
      <Fab
        className={classes.fab}
        size="small"
        color="primary"
        aria-label="add"
        onClick={handleAddChore}
      >
        <AddIcon />
      </Fab>
      <AddChoreDialog
        open={showDialog}
        onCancel={handleOnCancel}
        onSave={handleOnSave}
      />
    </Box>
  );
}

// import {
//   Box,
//   Paper,
//   makeStyles,
//   createStyles,
//   Theme,
//   List,
// } from "@material-ui/core";
// import { Fab } from "@material-ui/core";
// import AddIcon from "@material-ui/icons/Add";
// import { AddChoreDialog } from "./AddChoreDialog";
// import { useState } from "react";
// import { ChoreCard } from "./ChoreCard";
// import { LoadingData } from "../api/models/LoadingData";
// import { ChoreWithAssignments } from "./models/ChoreWithAssignments";
// import { DeleteSingleData, GetData } from "../api/BackendAccess";
// import { queryUrl } from "../api/models/queryUrl";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     container: {
//       flex: "1 1 auto",
//       padding: "1px",
//     },
//     fab: {
//       position: "absolute",
//       bottom: theme.spacing(6),
//       right: theme.spacing(2),
//     },
//   })
// );

// export function ChoreList(): JSX.Element {
//   const classes = useStyles();
//   const [showDialog, setShowDialog] = useState(false);

//   // DeleteSingleData("/api/Chores", 1);

//   const chores: ChoreWithAssignments[] = (GetData(
//     queryUrl.choresAssignments
//   ) as LoadingData).data;

//   function handleOnCancel() {
//     setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct cancel logic.
//   }

//   function handleOnSave() {
//     setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct save logic.
//   }

//   function handleAddChore() {
//     setShowDialog(true);
//   }

//   return (
//     <Box className={classes.container} component={Paper}>
//       <List>
//         {chores?.map((chore) => (
//           <ChoreCard key={chore.id} chore={chore} />
//         ))}
//       </List>
//       <Fab
//         className={classes.fab}
//         size="small"
//         color="primary"
//         aria-label="add"
//         onClick={handleAddChore}
//       >
//         <AddIcon />
//       </Fab>
//       <AddChoreDialog
//         open={showDialog}
//         onCancel={handleOnCancel}
//         onSave={handleOnSave}
//       />
//     </Box>
//   );
// }
