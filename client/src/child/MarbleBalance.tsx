import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ImgMarbles from '../images/Marbles2.jpg';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      wrapper: {
        padding: theme.spacing(2),
        textAlign: 'center',
      },
      image: {
        width: 50,
        height: 50,
        
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
}));

type Prop = {
    marbles: number
}

export function MarbleBalance(props: Prop){
    const classes = useStyles();
    return(  
      <div className={classes.root}>
      <Grid container
          direction="row"
          justify="center"
          alignItems="center">
        <Grid item >
          <div className={classes.wrapper}>
            <div className={classes.image}>
              <img  className={classes.img} alt="complex" src={ImgMarbles} /> 
            </div>             
          </div>
        </Grid>
        <Grid item >
          <div className={classes.wrapper}>
            <Box fontWeight="fontWeightBold" fontSize="h4.fontSize">     
                {props.marbles}
            </Box>      
            <Typography >
              Belohnungen verdient
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
    )
}