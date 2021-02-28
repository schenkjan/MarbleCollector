import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chores from '../images/Chores.png';

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
  chores: number
}

export function ChoresFigures(props: Prop){
    const classes = useStyles();
    return(
        <Card variant="outlined" className={classes.root}>
            <div className={classes.details}>
                <CardActionArea className={classes.content}>
                    <CardMedia
                        className={classes.media}
                        image={Chores}
                        title="Chores"
                        
                    />
                </CardActionArea>
                <CardContent className={classes.content}>
                        <Typography color="textPrimary" variant="h2">
                          {props.chores}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Ämtli erledigt
                    </Typography>         
                </CardContent>
        </div>
      </Card> 
    )
}