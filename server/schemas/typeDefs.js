const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
  }

  type Mutation {
    addUser(name: String!): User
    addSkill(userId: ID!, skill: String!): User
    removeUser(userId: ID!): User
    removeSkill(userId: ID!, skill: String!): User
  }
`;

module.exports = typeDefs;