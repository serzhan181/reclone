import { gql } from "graphql-request";

export const AUTH_ME = gql`
  query {
    me {
      authenticated
      user {
        username
        email
        profile_picture_urn
        id
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($login: LoginUserInput!) {
    login(loginUserInput: $login) {
      access_token
      user {
        id
        email
        username
        profile_picture_urn
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($sign_up: CreateUserInput!) {
    signUp(signUpInput: $sign_up) {
      access_token
      user {
        id
        email
        username
        profile_picture_urn
      }
    }
  }
`;
