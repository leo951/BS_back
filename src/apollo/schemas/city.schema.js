const { gql } = require("apollo-server-express");

module.exports = gql`
  type City {
    id: ID
    name: String
    img: String
    parkings: [Parking]
  }

  extend type Query {
    getCitys: [City]!
    getCity(id: ID): City!
  }

  extend type Mutation {
    createCity(id: ID, name: String, img: String, parkings: [ID]): City
    updateCity(id: ID, name: String, img: String, parkings: [ID]): City
    deleteCity(id: ID!): City
  }
`;
