import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { PaginatedPosts } from "./generated/graphql";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPosts: {
            ...offsetLimitPagination(),
            merge(
              existing: PaginatedPosts,
              incoming: PaginatedPosts,
              { args }
            ) {
              if (existing?.posts && incoming?.posts) {
                const offset = args?.offset || 0;
                const mergedPosts = existing.posts.slice(0);
                for (let i = 0; i < incoming.posts.length; ++i) {
                  mergedPosts[offset + i] = incoming.posts[i];
                }
                return {
                  __typename: "PaginatedPosts",
                  hasMore: incoming.hasMore,
                  posts: mergedPosts,
                };
              }
              return incoming;
            },
          },
        },
      },
    },
  }),
  credentials: "include",
});
