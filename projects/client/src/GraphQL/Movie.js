import gql from "graphql-tag";

export const MovieFragment = gql`
  fragment movie on Movie {
    movieId
    title
    plot
    poster
    year
    avgRate
    in_genre {
      name
    }
    user_rated(userId: $userId)
  }
`

export const GetMovies = gql`
  query Movie(
    $first: Int,
    $filter: _MovieFilter,
    $orderBy: [_MovieOrdering],
    $userId: String!
  ) {
    movies: Movie(first: $first, filter: $filter, orderBy: $orderBy) {
      ...movie
    }
  }

  ${MovieFragment}
`;

export const GetMovieDetails = gql`
  query Movie($filter: _MovieFilter, $userId: String!) {
    movie: Movie(filter: $filter, first: 1) {
      ...movie
      similar(first: 15) {
        ...movie
      }
    }
  }

  ${MovieFragment}
`;

export const MovieSearch = gql`
  query MovieSearch($search: String!, $userId: String!, $first: Int) {
    movies: MovieSearch(search: $search, first: $first) {
      ...movie
    }
  }

  ${MovieFragment}
`;

export const MovieSearchSelect = gql`
  query MovieSearch($search: String! $first: Int) {
    movies: MovieSearch(search: $search, first: $first) {
      movieId
      title
      poster
    }
  }
`;

export const UserRatedMovies = gql`
  query UserRatedMovies($userId: String!, $first: Int) {
    movies: UserRatedMovies(userId: $userId, first: $first) {
      ...movie
    }
  }

  ${MovieFragment}
`;

export const UserRecommendedMovies = gql`
  query UserRecommendedMovies($userId: String!, $first: Int) {
    movies: UserRecommendedMovies(userId: $userId, first: $first) {
      ...movie
    }
  }

  ${MovieFragment}
`;

export const MergeUserRate = gql`
  mutation MergeUserRATED_rel($from: _UserInput!, $to: _MovieInput!, $data: _RATEDInput!) {
    rate: MergeUserRATED_rel(from: $from, to: $to, data: $data) {
      rating
    }
  }
`;
