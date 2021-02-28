import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ImgMarbles from '../images/Marbles.png';

const useStyles = makeStyles({
    media: {
      height: 140
    },
  });

type Prop = {
    marbles: number
}

export function MarbleBalance(props: Prop){
    const classes = useStyles();
    return(
        <Card variant="outlined">
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={ImgMarbles}
                    title="Marbles"
                />
                <CardContent>
                    <Typography color="textPrimary" variant="h2">
                        {props.marbles}
                    </Typography>         
                    <Typography color="textSecondary" gutterBottom>
                        Murmeln
                    </Typography>
                </CardContent>
        </CardActionArea>
      </Card> 
    )
}