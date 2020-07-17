export default `
  type AuthToken {
    token: String
  }

  type Mutation {
    createAccessToken(email: String, password: String!) : AuthToken
  }
`;
