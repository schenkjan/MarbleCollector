import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LoginScreen } from "./login/LoginScreen";
import { ChildScreen } from "./child/ChildScreen";
import { ParentScreen } from "./parent/ParentScreen";
import { HomeScreen } from "./home/HomeScreen";
import { RecoilRoot } from "recoil";
import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from "@material-ui/core";

const useStyles = makeStyles({
  linkList: { // TODO js (25.02.2021): Nav element is only temporary remove it when ready.
    listStyle: "none",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    backgroundColor: "#333333",
    "& > *": { // list items
      float: "left",
      "& > *": { // link
        display: "block",
        color: "#fff",
        textAlign: "center",
        padding: "0px 16px 0px 16px",
        textDecoration: "none",
      }
    }
  },
});

// TODO js (25.02.2021): Nav element is only temporary remove it when ready.
function App() {
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      type: "light"
        //type: "dark"
    }
});

  return (
    <RecoilRoot>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <nav>
              <ul className={classes.linkList}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/child">Child</Link>
                </li>
                <li>
                  <Link to="/parent">Parent</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/login">
                <LoginScreen />
              </Route>
              <Route path="/child">
                <ChildScreen />
              </Route>
              <Route path="/parent">
                <ParentScreen />
              </Route>
              <Route path="/">
                <HomeScreen />
              </Route>
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
