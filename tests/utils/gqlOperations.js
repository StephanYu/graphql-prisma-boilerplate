import { gql } from "apollo-boost";

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const loginUser = gql`
  mutation($data: LoginUserInput) {
    loginUser(data: $data) {
      token
    }
  }
`;

const getMyProfile = gql`
  query {
    myProfile {
      id
      name
      email
    }
  }
`;

export { createUser, getUsers, loginUser, getMyProfile };
