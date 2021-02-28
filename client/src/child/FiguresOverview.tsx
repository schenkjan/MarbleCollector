import Container from '@material-ui/core/Container';
import {ChoresFigures} from './ChoresFigures';
import {RewardsFigures} from './RewardsFigures';
import {MarbleBalance} from './MarbleBalance';
import {loadChores} from '../api/BackendAccess';
import {useState, useEffect} from 'react';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

export function FiguresOverview(){

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
            <MarbleBalance marbles={marbles}></MarbleBalance>
            <ChoresFigures chores={chores}></ChoresFigures>
            <RewardsFigures rewards={rewards}></RewardsFigures>
        </Container>

    )
}