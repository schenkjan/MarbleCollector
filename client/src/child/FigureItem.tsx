import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
      textwrapper: {
        width: '200px'
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
    ammount: number,
    picture: string,
    imgDescription: string,
    text: string
}

export function FigureItem(props: Prop){
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
              <img  className={classes.img} alt={props.imgDescription} src={props.picture}/> 
            </div>             
          </div>
        </Grid>
        <Grid item >
          <div className={classes.wrapper}>
            <Box fontWeight="fontWeightBold" fontSize="h4.fontSize">     
                {props.ammount}
            </Box>
            <div className={classes.textwrapper}>            
              <Typography >
                {props.text}
              </Typography>
            </div>      
          </div>
        </Grid>
      </Grid>
    </div>
    )
}