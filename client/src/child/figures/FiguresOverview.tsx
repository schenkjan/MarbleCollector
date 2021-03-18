import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { FigureItem } from "./FigureItem";
import ImgMarbles from "../images/Marble.png";
import ImgChores from "../images/Chores.png";
import ImgRewards from "../images/Rewards.png";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";

const useStyles = makeStyles({
  gridcontainer: {
    display: "grid",
    padding: "10px",
  },
  root: {
    flexGrow: 1,
  },

  marbles: {
    padding: "20px 0",
    "grid-column": "1 / 4",
    "grid-row": "1 / 3",
  },

  chores: {
    padding: "20px 0",
    "grid-column": "4 / 8",
  },
  rewards: {
    "grid-column": "4 / 8",
  },
});

export function FiguresOverview() {
  const classes = useStyles();
  useDashboardTitle("Kinder bereich");
  const [marbles, setMarbles] = useState(0);
  const [chores, setChores] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [hubConnection, setHubConnection] = useState<HubConnection>();

  const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;
  const hubTestUrl = `${apiBaseUrl}/hubs/children`;

  useEffect(() => {
    const createHubConnection = async () => {
      if (hubConnection == null) {
        console.log("SignalR >>> Connecting", hubTestUrl);
        const hubConnect = new HubConnectionBuilder()
          .withUrl(hubTestUrl)
          .withAutomaticReconnect()
          .build();
        try {
          await hubConnect.start();
          console.log("SignalR >>> Connection successful");
        } catch (err) {
          alert(err);
        }

        hubConnect.on("UpdateFigures", (...args: any[]) => {
          setMarbles((marbles) => marbles + 1);
          setChores((chores) => chores + 1);
          setRewards((rewards) => rewards + 1);
        });

        setHubConnection(hubConnect);
      } else {
        console.log("SignalR >>> Connection exists...", hubConnection);
      }
    };
    createHubConnection();
  }, [hubConnection, hubTestUrl]);

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3}>
              <FigureItem
                ammount={marbles}
                picture={ImgMarbles}
                imgDescription="marble"
                text="Kontostand Murmeln"
              ></FigureItem>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3}>
              <FigureItem
                ammount={chores}
                picture={ImgChores}
                imgDescription="chores"
                text="Erledigte Ämtli"
              ></FigureItem>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3}>
              <FigureItem
                ammount={rewards}
                picture={ImgRewards}
                imgDescription="rewards"
                text="Verdiente Belohnungen"
              ></FigureItem>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
