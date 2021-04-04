import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";
import { useSuccessNotification } from "../hooks/SnackbarHooks";

const messages = [
  "I love you too!",
  "You are so sweet!",
  "Ig ha di o gärn!",
  "Du bisch mi Schatz!",
];

export function LikeButton(): JSX.Element {
  const showLikeMessage = useSuccessNotification();

  function handleOnClick() {
    const index = Math.floor(Math.random() * messages.length);

    showLikeMessage(messages[index]);
  }

  return (
    <IconButton aria-label="add to favorites" onClick={handleOnClick}>
      <FavoriteIcon />
    </IconButton>
  );
}
