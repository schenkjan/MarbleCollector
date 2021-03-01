import { makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rewards from '../images/Rewards.png';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    image: {
      width: 50,
      height: 50,
      'padding-left': '20px'
    },
    img: {
      margin: 'auto',
      // display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

type Prop = {
  rewards: number
}

export function RewardsFigures(props: Prop){
    const classes = useStyles();
    return(
        <div className={classes.root}>
        <Grid container
            direction="row"
            justify="center"
            alignItems="center">
          <Grid item >
            <Paper className={classes.paper}>
              <div className={classes.image}>
                <img  className={classes.img} alt="complex" src={Rewards} /> 
              </div>             
            </Paper>
          </Grid>
          <Grid item >
            <Paper className={classes.paper}>
              <Typography>
                {props.rewards}
              </Typography>
              <Typography>
                Belohnungen verdient
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
}