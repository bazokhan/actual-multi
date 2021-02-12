import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

const Home = lazy(() => import('../pages/Home'));
const Account = lazy(
  () => import('../pages/Accounts/[AccountID]')
);
const CreateReport = lazy(
  () => import('../pages/Reports/Create')
);

const AppRoutes = () => (
  <Suspense fallback={<Spinner />}>
    <Switch>
      <Route
        path="/test"
        exact
        component={() => <p>Test success</p>}
      />
      <Route
        path="/accounts/:accountid"
        component={Account}
      />
      <Route
        path="/reports/create"
        exact
        component={CreateReport}
      />
      <Route
        path="/:notfound"
        component={() => <p>404</p>}
      />
      <Route path="/" exact component={Home} />
    </Switch>
  </Suspense>
);

export default AppRoutes;
