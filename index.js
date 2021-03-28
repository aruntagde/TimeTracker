/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import React from 'react';
import { name as appName } from './app.json';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://test-323.herokuapp.com/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTEzOTEyMjAxMDg5OTc2ODczOTYyIn0sImdpdmVuX25hbWUiOiJBcnVuIiwiZmFtaWx5X25hbWUiOiJUYWdkZSIsIm5pY2tuYW1lIjoiYXJ1bjE1LnRhZ2RlIiwibmFtZSI6IkFydW4gVGFnZGUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1nUGFxVTdhYTJ4Zy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNrM0MtQ2pSdzlyZFk3YVkzVUFXLXdqaHZxTVJ3L3M5Ni1jL3Bob3RvLmpwZyIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMjEtMDMtMjhUMTY6MDQ6NTcuMTcyWiIsImlzcyI6Imh0dHBzOi8vdGVzdC0zMjMudXMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEzOTEyMjAxMDg5OTc2ODczOTYyIiwiYXVkIjoiTXJVUzNzWUxKVFNaWjMyaVIzeDlIcEFidzM5VlVSVWgiLCJpYXQiOjE2MTY5NDc0OTcsImV4cCI6MTYxNjk4MzQ5NywiYXRfaGFzaCI6IjVreDNKemlmQnBRWnItUm9sbFpFZGciLCJub25jZSI6Im1BdnUudjZKcDIySUlYOTFNRGkzUTZOX3Y2dlNkdEpPIn0.hQQrSMVO3ZLceuzsvVqKsUdnIXZ4rL7kIaO0D0DaDve7LDiQZAiY44jZvtYTutIBKc-MH3YhijLx5o6cpTKvtv6hIoeYc7_dqPGDrtvagdCivplNpiu4auoze2RUjZUZY2PIE5oAtFhqk0tSfAhF57AHOGvTKVULwBRat1M-ahW3jWEtO0TXwSXNFVrTv_XtySQXS6LmvVyMSfcEZx3jWvsDUG9_QCgRpNjfvP7MymOfAZRpvjAQ71rFEcd57i_sYpcuRa5nBbYwALnFrvepnLN9LTDxMl_h7f5aIJ4CC95JltE2ephyNSEz_7GX2c3mCn1qPox0T-RJqRvzjLmqJw';
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


const RootApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);


AppRegistry.registerComponent(appName, () => RootApp);
