import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

Vue.use(VueApollo);

const httpLink = createHttpLink({
  uri: "https://ricardocastanho-ubiquitous-space-spork-g7p7qjvwpr4hvrvv-3003.preview.app.github.dev/",
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default new VueApollo({
  defaultClient: apolloClient,
});
