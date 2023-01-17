import gql from "graphql-tag";

export const CreateUser = gql`
  mutation CreateUser($name: String!, $userId: String!) {
    user: CreateUser(name: $name, userId: $userId) {
      name
      userId
    }
  }
`;

export const UpdateUser = gql`
  mutation UpdateUser($userId: String!, $name: String) {
    user: UpdateUser(userId: $userId, name: $name) {
      name
      userId
    }
  }
`;


export const DeleteUser = gql`
  mutation DeleteUser($userId: String!) {
    user: DeleteUser(userId: $userId) {
      name
    }
  }
`;

export const SignUserIn = gql`
  query User($name: String) {
    user: User(first: 1, name: $name) {
      name
      userId
    }
  }
`;

export const UserFavoriteGenres = gql`
  query UserFavoriteGenres($userId: String!, $first: Int) {
    genres: UserFavoriteGenres(userId: $userId, first: $first) {
      name
    }
  }
`;

