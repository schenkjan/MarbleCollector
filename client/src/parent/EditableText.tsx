import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

type Prop = {
  text: string;
  onTextChanged?: (newText: string) => void;
};

export function EditableText(props: Prop): JSX.Element {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(props.text);
  }, [props.text]);

  function handleOnClick() {
    props.onTextChanged && props.onTextChanged(text); // TODO js (17.03.2021): Replace dummy implementation!
  }

  return (
    <Box onClick={handleOnClick}>
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
}
