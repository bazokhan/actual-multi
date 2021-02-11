import { Route, Switch } from 'react-router-dom';
import Account from '../pages/Account';
import Home from '../pages/Home';

const AppRoutes = () => (
  <Switch>
    <Route
      path="/test"
      component={() => <p>Test success</p>}
    />
    <Route path="/:accountid" component={Account} />
    <Route path="/:notfound" component={() => <p>404</p>} />
    <Route path="/" component={Home} />
  </Switch>
);

export default AppRoutes;
