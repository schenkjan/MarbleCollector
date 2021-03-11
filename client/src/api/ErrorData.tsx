import { Box } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

export const doError = (error: unknown) => {
  return (
    <Box>
      <ErrorIcon color="secondary" fontSize="large" />
      <p>{`An error has occurred: ${error}`}</p>
    </Box>
  ); // TODO js (04.03.2021): Implement more sophisticated error screen. Refactor to general error screen?
};
