import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { IpfsProvider } from './providers/IpfsProvider';
import { OrbitProvider } from './providers/OrbitProvider';
import Home from './pages/Home';
import Overview from './pages/Overview';
import { Database } from './pages/Database';
/**
 * The management koios webapp has three routes. / -> root, overview and database
 */
const App = () => {
  return (
    <Router>
      <IpfsProvider>
        <OrbitProvider>
          <Route>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/overview" exact component={Overview} />
              <Route path="/database" exact component={Database} />
            </Switch>
          </Route>
        </OrbitProvider>
      </IpfsProvider>
    </Router>
  );
};

export default App;
