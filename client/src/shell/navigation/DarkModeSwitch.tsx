import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { useDarkModeState } from "../../AppState";

export function DarkModeSwitch(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useDarkModeState();

  function handleOnClick() {
    setIsDarkMode((previous) => !previous);
  }

  return (
    <>
      {isDarkMode ? (
        <Brightness7Icon onClick={handleOnClick} />
      ) : (
        <Brightness4Icon onClick={handleOnClick} />
      )}
    </>
  );
}
