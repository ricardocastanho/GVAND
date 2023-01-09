import gql from "graphql-tag";

export const GetMovies = gql`
  query GetMovies {
    movies: Movie(first: 25) {
      title
    }
  }
`;
