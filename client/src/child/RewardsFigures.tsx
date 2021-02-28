import { makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rewards from '../images/Rewards.png';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
      },
      details: {
        display: 'flex',
        flexDirection: 'row',
      },
      content: {
        flex: '1 0 auto'
      },
    media: {
        height: 140
    },
  }));

type Prop = {
  rewards: number
}

export function RewardsFigures(props: Prop){
    const classes = useStyles();
    return(
        <Card variant="outlined" className={classes.root}>
            <div className={classes.details}>
                <CardActionArea className={classes.content}>
                    <CardMedia
                        className={classes.media}
                        image={Rewards}
                        title="Rewards"
                    />
                </CardActionArea>
                <CardContent className={classes.content}>
                        <Typography color="textPrimary" variant="h2">
                            {props.rewards}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Belohnungen verdient
                    </Typography>         
                </CardContent>
        </div>
      </Card> 
    )
}