const Spot = require("../../models/spot.model");

module.exports = {
  Query: {
    getSpots: () => {
      return Spot.find()
        .clone()
        .catch((err) => console.log(err));
    },
    getSpot: (parent, args, context) => {
      return Spot.findById(args.id)
        .clone()
        .catch((err) => console.log(err));
    },
  },

  Mutation: {
    createSpot: (parent, args) => {
      const spot = new Spot({
        number: args.number,
        available: args.available,
      });
      return spot.save();
    },

    updateSpot(parent, { id, number, available }) {
      try {
        return Spot.findByIdAndUpdate(id, {
          number: number,
          available: available,
        }).clone();
      } catch (error) {
        return error;
      }
    },
    deleteSpot(parents, { id }) {
      return Spot.findByIdAndRemove(id);
    },
  },
};
