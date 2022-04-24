const { gql } = require("apollo-server-express");

module.exports = gql`
  type Parking {
    id: ID
    name: String
    floors: [Floor]
  }

  extend type Query {
    getParkings: [Parking]!
    getParking(id: ID): Parking!
  }

  extend type Mutation {
    createParking(id: ID, name: String, floors: [ID]): Parking
    updateParking(id: ID, name: String, floors: [ID]): Parking
    deleteParking(id: ID!): Parking
  }
`;
