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

export const SignUserIn = gql`
  query User($name: String) {
    user: User(first: 1, name: $name) {
      name
      userId
    }
  }
`;
