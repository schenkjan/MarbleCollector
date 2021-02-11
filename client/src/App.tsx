import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { LoginScreen } from "./login/LoginScreen";
import { ChildScreen } from "./child/ChildScreen";
import { ParentScreen } from "./parent/ParentScreen";

function App() {
  return (
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
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
            <section>
              <h3>Hub communication</h3>
            </section>
            <section>
              <h3>REST communication</h3>
            </section>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
