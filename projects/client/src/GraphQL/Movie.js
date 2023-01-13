import gql from "graphql-tag";

export const GetMovies = gql`
  query Movie($first: Int, $orderBy: [_MovieOrdering]) {
    movies: Movie(first: $first, orderBy: $orderBy) {
      title
      plot
      poster
    }
  }
`;
