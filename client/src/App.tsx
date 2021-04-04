import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { HomeScreen } from "./home/HomeScreen";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { AuthController } from "./auth/AuthController";
import { QueryClient, QueryClientProvider } from "react-query";
import { DashboardLayout } from "./shell/DashboardLayout";
import { HubConnectionHandler } from "./notifications/HubConnectionHandler";
import { ProtectedArea } from "./auth/ProtectedArea";
import { useTheme } from "./shell/hooks/DarkThemeHook";

const queryClient = new QueryClient();

function App() {
  const theme = useTheme();

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <DashboardLayout>
              <Switch>
                <Route path="/" exact>
                  <HomeScreen />
                </Route>
                <Route path="/auth">
                  <AuthController />
                </Route>
                <Route path="/app">
                  <ProtectedArea />
                </Route>
                <Route>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </DashboardLayout>
            <HubConnectionHandler />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;