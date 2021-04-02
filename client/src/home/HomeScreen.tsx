import React from "react";
import {
  Box,
  Container,
  createStyles,
  Divider,
  Grid,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { useDashboardTitle } from "../shell/hooks/DashboardTitleHook";
import { promotions } from "./HomeScreenPromotions";
import { YoutubeEmbed } from "./YoutubeEmbed";
import { HomeScreenPromotionCard } from "./HomeScreenPromotionCard";
import { Footers } from "./HomeScreenFooter";

const useStyles = makeStyles((theme) =>
  createStyles({
    "@global": {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: "none",
      },
    },
    heroContent: {
      padding: theme.spacing(3, 4, 3),
    },
    divider: {
      marginBottom: 20,
      marginTop: 20,
      marginLeft: "10%",
      marginRight: "10%",
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
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up("sm")]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
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
          component="h4"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Willkommen bei MarbleCollector
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
        >
          Haben auch Sie Mühe die Kinder unter ihrer Aufsicht zum Erledigen von
          Hausarbeiten zu motivieren?
        </Typography>
        <Divider className={classes.divider} />
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
        >
          Das hat mit MarbleCollector ein Ende! Entdecken sie die neue
          revolutionäre App.
        </Typography>
        <br />
        <YoutubeEmbed embedId="RyMqWX4BQSI" />
      </Container>
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Divider className={classes.divider} />
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
        >
          Finden Sie den richtigen Plan für ihre Situation und legen sie noch
          heute los.
        </Typography>
        <br />
        <Grid container spacing={5} alignItems="flex-end">
          {promotions.map((tier, index) => (
            <HomeScreenPromotionCard key={index} tier={tier} />
          ))}
        </Grid>
      </Container>
      {/* <HomeScreenPoC /> */}
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {Footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link
              color="inherit"
              href="https://github.com/TashunkoWitko/MarbleCollector"
              target="_blank"
            >
              MarbleCollector
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
      {/* End footer */}
    </>
  );
}
