import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { ChildScreen } from "./child/ChildScreen";
import { ParentScreen } from "./parent/ParentScreen";
import { HomeScreen } from "./home/HomeScreen";
import { RecoilRoot, useRecoilValue } from "recoil";
import {
  createMuiTheme,
  Container,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { AuthController } from "./auth/AuthController";
import { ShowSnack } from "./shell/Snackbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { AppState } from "./AppState";
import { ProtectedRoutesController } from "./auth/ProtectedRoutesController";

const queryClient = new QueryClient();

const useStyles = makeStyles({
  linkList: {
    // TODO js (25.02.2021): Nav element is only temporary remove it when ready.
    listStyle: "none",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    backgroundColor: "#333333",
    "& > *": {
      // list items
      float: "left",
      "& > *": {
        // link
        display: "block",
        color: "#fff",
        textAlign: "center",
        padding: "0px 16px 0px 16px",
        textDecoration: "none",
      },
    },
  },
});

// TODO js (25.02.2021): Nav element is only temporary remove it when ready.
function App() {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      type: "light",
    },
  });

  const userIsAuthenticated = useRecoilValue(AppState.userIsAuthenticated);

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
              <nav>
                <ul className={classes.linkList}>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/auth">Auth</Link>
                  </li>
                  <li>
                    <Link to="/app/child">Child</Link>
                  </li>
                  <li>
                    <Link to="/app/parent">Parent</Link>
                  </li>
                </ul>
              </nav>

              <Switch>
                <Route path="/" exact>
                  <HomeScreen />
                </Route>
                <Route path="/auth">
                  <AuthController />
                </Route>
                <ProtectedRoute routeProps={{ path: "/app" }}>
                  <ProtectedRoutesController />
                </ProtectedRoute>
              </Switch>
              <ShowSnack />
            </div>
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
