import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { useDashboardTitle } from "../shell/hooks/DashboardTitleHook";
import { HomeScreenPoC } from "./HomeScreenPoC";
import { Star } from "@material-ui/icons";
import { promotions } from "./HomeScreenPromotions";

const useStyles = makeStyles((theme) =>
  createStyles({
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    divider: {
      marginBottom: 10,
      marginTop: 10,
      marginLeft: "20%",
      marginRight: "20%",
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[700],
    },
    cardPricing: {
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      marginBottom: theme.spacing(2),
    },
  })
);

export function HomeScreen() {
  const classes = useStyles();
  useDashboardTitle("MarbleCollector");
  const userIsAuthenticated = useRecoilValue(AppState.userIsAuthenticated);

  return (
    <>
      {userIsAuthenticated && <Redirect to="/app" />}
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Willkommen
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Haben auch Sie Mühe ihre Kinder zum Erledigen von Hausarbeiten zu
          überzeugen?
        </Typography>
        <Divider className={classes.divider} />
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Das hat mit MarbleCollector ein Ende! Entdecken sie die neue und
          revolutionäre App.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {promotions.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <Star /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth color="primary">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <HomeScreenPoC />
    </>
  );
}
