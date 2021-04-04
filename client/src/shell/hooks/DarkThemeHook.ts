import { grey } from "@material-ui/core/colors";
import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { useDarkModeState } from "../../AppState";

export function useTheme(): Theme {
  const [isDarkTheme] = useDarkModeState();

  const lightTheme = createMuiTheme({
    palette: {
      type: "light",
    },
  });

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: grey[900],
      },
    },
  });

  return isDarkTheme ? darkTheme : lightTheme;
}
