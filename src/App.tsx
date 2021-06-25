import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import Login from "./containers/Login";

import { Main } from "./containers/Main";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' exact={true} component={Main} />
        <Route path='/login' component={Login} />
      </Switch>
    </HashRouter>
  );
}

export default App;
