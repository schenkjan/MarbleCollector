import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { useProfileCardStyles } from "./ProfileCardStyles";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  image: {
    width: 35,
    height: 35,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

type Prop = {
  ammount: number;
  picture?: string;
  imgDescription?: string;
  icon?: any;
  text: string;
};

export function UserScoreCardItem(props: Prop) {
  const classes = useStyles();
  const profileCardStyles = useProfileCardStyles();
  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={4}>
          <div className={classes.image}>
            {props.picture && (
              <Avatar
                className={classes.img}
                alt={props.imgDescription}
                src={props.picture}
              />
            )}
            {props.icon && props.icon}
          </div>
        </Grid>
        <Grid item xs={8}>
          <Box className={profileCardStyles.heading}>{props.ammount}</Box>
          <span className={profileCardStyles.subheader}>{props.text}</span>
        </Grid>
      </Grid>
    </>
  );
}
