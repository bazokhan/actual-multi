import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql
} from '@apollo/client';
import { types } from 'mobx-state-tree';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Home from './pages/Home';
import getQueryFromModel from './helpers/getQueryFromModel';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
});

const TransactionStore = types.model('Transaction', {
  id: types.identifier,
  amount: types.optional(types.number, 0)
});

const AccountStore = types.model('Account', {
  id: types.identifier,
  transactions: types.optional(
    types.array(TransactionStore),
    []
  )
});

client
  .query({
    query: gql`
      query GetAccounts {
        ${getQueryFromModel('accounts', AccountStore, {
          accounts: {},
          transactions: { amount: { _gte: 1000000 } }
        })}
      }
    `
  })
  .then(result => console.log(result));

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Switch>
          <Route
            path="/test"
            component={() => <p>Test success</p>}
          />
          <Route
            path="/:notfound"
            component={() => <p>404</p>}
          />
          <Route path="/" component={Home} />
        </Switch>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
