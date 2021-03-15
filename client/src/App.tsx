import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeScreen } from "./home/HomeScreen";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { AuthController } from "./auth/AuthController";
import { ShowSnack } from "./shell/Snackbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { ProtectedRoutesController } from "./auth/ProtectedRoutesController";
import { DashboardLayout } from "./shell/DashboardLayout";

const queryClient = new QueryClient();

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "light",
    },
  });

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
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
