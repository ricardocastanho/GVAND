import gql from "graphql-tag";

export const GetMovies = gql`
  query Movie($first: Int, $filter: _MovieFilter, $orderBy: [_MovieOrdering]) {
    movies: Movie(first: $first, filter: $filter, orderBy: $orderBy) {
      title
      plot
      poster
      year
      imdbRating
      in_genre {
        name
      }
    }
  }
`;
