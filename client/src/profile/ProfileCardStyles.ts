import { makeStyles } from "@material-ui/core";

export function getUsernameUppercase(username: string) {
  if (username) {
    return username.charAt(0).toUpperCase() + username.slice(1);
  }
  return username;
}

export const useProfileCardStyles = makeStyles(({ palette }) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: "center",
    margin: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    margin: 0,
  },
  subheader: {
    fontSize: 18,
    color: palette.grey[500],
    marginBottom: "0.875em",
  },
}));
