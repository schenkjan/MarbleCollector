import React from "react";
import {
  Container,
  createStyles,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    heroContent: {
      padding: theme.spacing(3, 4, 3),
    },
    divider: {
      marginBottom: 20,
      marginTop: 20,
      marginLeft: "10%",
      marginRight: "10%",
    },
  })
);

export type LogoutSuccessProps = {
  username: string;
  secondsTillRedirect: number;
};

export function LogoutSuccess(props: LogoutSuccessProps) {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
        >
          Danke <b>{props.username}</b> fürs Nutzen von Marblecollector!
        </Typography>
        <Divider className={classes.divider} />
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
        >
          Möchtest du mehr über Marblecollector erfahren? Hier gehts zur{" "}
          <a href="https://github.com/TashunkoWitko/MarbleCollector/tree/main/doc">
            Dokumentation
          </a>
        </Typography>
        <Divider className={classes.divider} />
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
        >
          Du wirst in {props.secondsTillRedirect} Sekunden umgeleitet...
        </Typography>
      </Container>
    </>
  );
}
