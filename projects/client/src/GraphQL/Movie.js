import gql from "graphql-tag";

export const MovieFragment = gql`
  fragment movie on Movie {
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
`

export const GetMovies = gql`
  query Movie($first: Int, $filter: _MovieFilter, $orderBy: [_MovieOrdering]) {
    movies: Movie(first: $first, filter: $filter, orderBy: $orderBy) {
      ...movie
    }
  }

  ${MovieFragment}
`;

export const GetMovieDetails = gql`
  query Movie($filter: _MovieFilter) {
    movie: Movie(filter: $filter, first: 1) {
      ...movie
      similar(first: 15) {
        ...movie
      }
    }
  }

  ${MovieFragment}
`;
