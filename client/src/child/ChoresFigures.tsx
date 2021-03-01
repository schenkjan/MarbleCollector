import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chores from '../images/Chores.png';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: 'flex'
    //   },
    //   details: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //   },
    //   content: {
    //     flex: '1 0 auto'
    //   },
    // media: {
    //     height: 140
    // },
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
  chores: number
}

export function ChoresFigures(props: Prop){
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
              <img  className={classes.img} alt="complex" src={Chores} /> 
            </div>             
          </Paper>
        </Grid>
        <Grid item >
          <Paper className={classes.paper}>
            <Typography>
              {props.chores}
            </Typography>
            <Typography>
              Belohnungen verdient
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
      //   <Card variant="outlined" className={classes.root}>
      //       <div className={classes.details}>
      //           <CardActionArea className={classes.content}>
      //               <CardMedia
      //                   className={classes.media}
      //                   image={Chores}
      //                   title="Chores"
                        
      //               />
      //           </CardActionArea>
      //           <CardContent className={classes.content}>
      //                   <Typography color="textPrimary" variant="h2">
      //                     {props.chores}
      //                   </Typography>
      //                   <Typography color="textSecondary" gutterBottom>
      //                     Ämtli erledigt
      //               </Typography>         
      //           </CardContent>
      //   </div>
      // </Card> 
    )
}