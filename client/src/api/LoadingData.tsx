import { Box, CircularProgress } from "@material-ui/core";

export const doLoading = () => {
  return (
    <Box>
      <p>Loading...</p>
      <CircularProgress />
    </Box>
  ); // TODO js (04.03.2021): Implement more sophisticated loading screen. Refactor to general loading screen/overlay?
};
