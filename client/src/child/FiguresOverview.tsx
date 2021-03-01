import Container from '@material-ui/core/Container';
import { makeStyles} from '@material-ui/core/styles';
import {ChoresFigures} from './ChoresFigures';
import {RewardsFigures} from './RewardsFigures';
import {MarbleBalance} from './MarbleBalance';
import {loadChores} from '../api/BackendAccess';
import {useState, useEffect} from 'react';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

const useStyles = makeStyles({
  gridcontainer: {
    display: 'grid',
    'grid-template-columns': 'auto auto auto auto auto auto',
    'grid-gap': '10px',
    'background-color': '#2196F3',
    padding: '10px',
    //width:'70%'
  },
  
  item2: {
    'background-color': 'rgba(255, 255, 255, 0.8)',
    'text-align': 'center',
    'padding': '20px 0',
    'font-size': '30px',
    'grid-column': '4 / 8',
  },
  item3: {
    'background-color': 'rgba(255, 255, 255, 0.8)',
    'text-align': 'center',
    'padding': '20px 0',
    'font-size': '30px',
    'grid-column': '4 / 8',
  },
  item1: {
    'background-color': 'rgba(255, 255, 255, 0.8)',
    'text-align': 'center',
    'padding': '20px 0',
    'font-size': '30px',
    'grid-column': '1 / 4',
    'grid-row': '1 / 3',
  }
});

export function FiguresOverview(){
  const classes = useStyles();

    const [marbles, setMarbles] = useState(0);
    const [chores, setChores] = useState(0);
    const [rewards, setRewards] = useState(0);
    const [hubConnection, setHubConnection] = useState<HubConnection>();

    const apiBaseUrl = process.env.REACT_APP_APIBASEURL as string;
    const hubTestUrl = `${apiBaseUrl}/hubs/children`;

    useEffect(() => {
        loadChores().then(
            function(response){
                setMarbles(response.data.length);
                setChores(response.data.length + 1);
                setRewards(response.data.length + 2)
            }
        )

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
                setMarbles(marbles => marbles + 1);
                setChores(chores => chores + 1);
                setRewards(rewards => rewards + 1)
              });
      
              setHubConnection(hubConnect);
            } else {
              console.log("SignalR >>> Connection exists...", hubConnection);
            }
          };
        createHubConnection();
      }, []);

    return(
      
        <Container maxWidth="md">
            <div  className={classes.gridcontainer}>
              <div className={classes.item1}>
                1
              </div>
              <div className={classes.item2}>
                2
              </div>
              <div className={classes.item3}>
                3
              </div>
                {/* <MarbleBalance marbles={marbles}></MarbleBalance>
                <ChoresFigures chores={chores}></ChoresFigures>
                <RewardsFigures rewards={rewards}></RewardsFigures> */}
            </div>
        </Container>

    )
}