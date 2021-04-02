import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeScreen } from "./home/HomeScreen";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { AuthController } from "./auth/AuthController";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { ProtectedRoutesController } from "./auth/ProtectedRoutesController";
import { DashboardLayout } from "./shell/DashboardLayout";
import { HubConnectionHandler } from "./notifications/HubConnectionHandler";
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
                <ProtectedRoute routeProps={{ path: "/app" }}>
                  <ProtectedRoutesController />
                </ProtectedRoute>
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
