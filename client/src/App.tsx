import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LoginScreen } from "./login/LoginScreen";
import { ChildScreen } from "./child/ChildScreen";
import { ParentScreen } from "./parent/ParentScreen";
import { HomeScreen } from "./home/HomeScreen";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <nav>
            <ul>
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
      </Router>
    </RecoilRoot>
  );
}

export default App;
