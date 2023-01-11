import gql from "graphql-tag";

export const CreateUser = gql`
  mutation CreateUser($name: String!, $userId: String!) {
    CreateUser(name: $name, userId: $userId) {
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
