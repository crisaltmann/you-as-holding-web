import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./containers/Login";

import { Main } from "./containers/Main";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} component={Main} />
        <Route path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
