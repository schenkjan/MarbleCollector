import Container from '@material-ui/core/Container';
import {ChoresFigures} from './ChoresFigures';
import {RewardsFigures} from './RewardsFigures';
import {MarbleBalance} from './MarbleBalance';

export function FiguresOverview(){
    const marbles: number = 12;
    const chores: number = 51;
    const rewards: number = 17;

    return(
        <Container maxWidth="md">
            <MarbleBalance marbles={marbles}></MarbleBalance>
            <ChoresFigures chores={chores}></ChoresFigures>
            <RewardsFigures rewards={rewards}></RewardsFigures>
        </Container>

    )
}