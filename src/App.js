import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql
} from '@apollo/client';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'https://prime-tetra-59.hasura.app/v1/graphql',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query GetAccounts {
        accounts(where: {}) {
          name
          transactions(
            where: { amount: { _gte: 100000 } }
          ) {
            id
          }
        }
      }
    `
  })
  .then(result => console.log(result));

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
