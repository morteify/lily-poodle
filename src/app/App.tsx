import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Spin } from "antd";
import StrategiesTable from "../features/ranking/components/StrategyTable";
import MarketAndStrategyView from "../features/marketAndStrategy/components/MarketAndStrategyOverview";

const App: React.FC = () => (
  <Suspense fallback={<Spin tip="Loading..." />}>
    <Router basename="/">
      <Switch>
        <Route path="/market-and-strategy-overview" component={MarketAndStrategyView} />
        <Route path="/" component={StrategiesTable} />
        <Redirect exact to="/" />
      </Switch>
    </Router>
  </Suspense>
);

export default App;
