import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { PromotionTier } from "./HomeScreenPromotions";
import { Star } from "@material-ui/icons";

type HomeScreenPromotionCardProps = {
  tier: PromotionTier;
};

const useStyles = makeStyles((theme) =>
  createStyles({
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
    cardFeatureList: {
      padding: 0,
      listStyleType: "none",
    },
  })
);

export function HomeScreenPromotionCard(props: HomeScreenPromotionCardProps) {
  const { tier } = props;
  const classes = useStyles();

  return (
    <>
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
            action={tier.showStar ? <Star /> : null}
            className={classes.cardHeader}
          />
          <CardContent>
            <div className={classes.cardPricing}>
              <Typography component="h4" variant="h4" color="textPrimary">
                ${tier.price}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                /Monat
              </Typography>
            </div>
            <ul className={classes.cardFeatureList}>
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
            <Button fullWidth color="primary" variant={tier.buttonVariant}>
              {tier.buttonText}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
