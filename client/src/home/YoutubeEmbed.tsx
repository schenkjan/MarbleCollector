import React from "react";
import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    videoResponsive: {
      overflow: "hidden",
      paddingBottom: "56.25%",
      position: "relative",
      height: 0,
    },
    videoResponsiveIframe: {
      left: 0,
      top: 0,
      height: "100%",
      width: "100%",
      position: "absolute",
    },
  })
);

type YoutubeEmbedProps = {
  embedId: string;
};

export function YoutubeEmbed(props: YoutubeEmbedProps) {
  const classes = useStyles();

  return (
    <div className={classes.videoResponsive}>
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${props.embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        className={classes.videoResponsiveIframe}
      />
    </div>
  );
}
