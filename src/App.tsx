import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Overview from './pages/Overview';

const App = () => {
  return (
    <Router>
      <Route>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/overview" exact component={Overview} />
        </Switch>
      </Route>
    </Router>
  );
};

export default App;
