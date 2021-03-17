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
import ErrorIcon from "@material-ui/icons/Error";
import { AddChoreDialog } from "./AddChoreDialog";
import { useState } from "react";
import { ChoreCard } from "./ChoreCard";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { useParentChoreData, UpdatePost } from "../../api/BackendAccess";
import { queryUrl } from "../../api/models/queryUrl";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { useMutation, useQuery } from "react-query";
import { AddChoreState } from "../../shell/models/AddChoreState";
import { convertToObject } from "typescript";

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
  useDashboardTitle("Ämtli Pinnwand");
  const classes = useStyles();

  const [showDialog, setShowDialog] = useState(false);
  const { chores } = useParentChoreData();
  const bearerToken = useRecoilValue(AppState.userBearerToken);

  // const {id} = props.match.params;
  const [addSingleChore, setAddSingleChore] = useRecoilState(
    AppState.addChoreInfo
  );
  // name: "",
  //   body: ""
  // });

  const { mutate } = useMutation(UpdatePost, {
    //   onSuccess: (data) => {
    //     refetch();
    //   },
  });

  // const { isLoading, isFetching, data, isError, refetch } = useQuery(
  //   ["posts", { id: id }],
  //   GetPost,
  //   {
  //     retry: 1,
  //     retryDelay: 500,
  //     refetchOnWindowFocus: false,
  //     onSuccess: (data) => {
  //       setAddSingleChore(addSingleChore);
  //     },
  //   }
  // );

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (isError) {
  //   return <p>Error getting posts...</p>;
  // }

  // const onChangeHandler = (e) => {
  //   e.persist()
  //   setState(prev => ({
  //     ...prev,
  //     [e.target.name]: e.target.value
  //   }))
  // }

  // const update = async () => {
  //   try {
  //     await mutate({
  //       id: id,
  //       body: state,
  //     });
  //   } catch (e) {}
  // };
  // const { isLoading, error, chores } = useParentChoreData();

  function handleOnCancel() {
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct cancel logic.
  }

  // function handleOnSave(choreObject: object) {
  //   console.log(JSON.stringify(choreObject));
  //   // e.persist()
  //   // setAddSingleChore(chores(choreObject));
  //   update();
  //   setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct save logic.
  // }

  function handleOnSave(choreObject: any) {
    // console.log(JSON.stringify(choreObject));
    // async (choreObject: AddChoreState) => {
    // try {
    // mutate(chores.push(choreObject));
    // setAddSingleChore(choreObject);
    // console.log(choreObject);
    mutate({
      token: bearerToken,
      object: choreObject,
    });
    chores.push(choreObject);

    // } catch (e) {}
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
