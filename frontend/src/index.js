import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/loop.scss?v1.1.0";
import "assets/css/landing-page.css";
import "assets/scss/livepeer.scss";

import Landing from "views/examples/Landing.js";
import Creators from "views/examples/Creators.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Livepeer from "views/livepeer/Livepeer";
import { StateProvider } from "./store/store";

ReactDOM.render(
  <StateProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={(props) => <Landing {...props} />} />
        <Route
          path="/profile/:address"
          exact
          render={(props) => <Profile {...props} />}
        />
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/creators">
          <Creators />
        </Route>
        <Route
          path="/stream/:streamId/:playbackId"
          exact
          render={(props) => <Livepeer {...props} />}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </StateProvider>,
  document.getElementById("root")
);
