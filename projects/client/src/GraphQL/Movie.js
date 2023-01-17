import gql from "graphql-tag";

export const GetMovies = gql`
  query Movie($first: Int, $filter: _MovieFilter, $orderBy: [_MovieOrdering]) {
    movies: Movie(first: $first, filter: $filter, orderBy: $orderBy) {
      movieId
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

export const GetMovieDetails = gql`
  query Movie($filter: _MovieFilter) {
    movie: Movie(filter: $filter, first: 1) {
      movieId
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
