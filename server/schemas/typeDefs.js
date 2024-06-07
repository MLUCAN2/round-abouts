const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    trips: [Trip]
  }
  
  type Trip {
    _id: ID
    tripName: String
    startDate: String
    endDate: String
    destination: String
    description: String
    activities: [Activity]
  }

  type Activity {
    _id: ID
    activityName: String
    date: String
    description: String
    destination: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    trips: [Trip]
    trip(tripId: ID!): Trip
    activities: [Activity]
    activitiesByUser(userId: ID!): [Activity]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    addTrip(tripName: String!, startDate: String!, endDate: String!, description: String!, destination: String!): Trip
    removeTrip(tripId: ID!): Trip
    addActivity(activityName: String!, date: String!, description: String!, destination: String!): Activity
    removeActivity(activityId: ID!): Activity
  }
`;

module.exports = typeDefs;