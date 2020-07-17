export default `
  type User {
    id: String
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input IUser {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Query {
    profile: User
    users: [User]
  }

  type Mutation {
    createUser(user: IUser!) : User
  }
`;
