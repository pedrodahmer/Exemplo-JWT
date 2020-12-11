import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache} from '@apollo/client'
import { ApolloProvider, createHttpLink } from '@apollo/react-hooks'
import { setContext } from '@apollo/client/link/context';

import { getAccessToken } from './accesToken';
import { App } from './App';

const httpLink = createHttpLink({
  uri: 'http://localhost:3333/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAccessToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client= new ApolloClient({
  uri: "http://localhost:3333/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include',
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
