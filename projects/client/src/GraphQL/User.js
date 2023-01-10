import gql from "graphql-tag";

export const CreateUser = gql`
  mutation CreateUser($name: String!, $userId: String!) {
    CreateUser(name: $name, userId: $userId) {
      name
    }
  }
`;
