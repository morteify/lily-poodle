import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Spin } from "antd";
import { MainLayout } from "../common/mainLayout/components";

const App: React.FC = () => (
  <Suspense fallback={<Spin tip="Loading..." />}>
    <Router basename="/">
      <Switch>
        <Route path="/home" component={MainLayout} />
        <Redirect exact to="/home" />
      </Switch>
    </Router>
  </Suspense>
);

export default App;
