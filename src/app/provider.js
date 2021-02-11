import PropTypes from 'prop-types';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { setContext } from '@apollo/client/link/context';
import theme from './theme';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'x-hasura-admin-secret':
      process.env.REACT_APP_HASURA_SECRET
  }
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const AppProvider = ({ children }) => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </ApolloProvider>
  </BrowserRouter>
);

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppProvider;
