const Floor = require("../../models/floor.model");

module.exports = {
  Query: {
    getFloors: () => {
      return Floor.find()
        .populate("spots")
        .clone()
        .catch((err) => console.log(err));
    },
    getFloor: (parent, args, context) => {
      return Floor.findById(args.id)
        .populate("spots")
        .clone()
        .catch((err) => console.log(err));
    },
  },

  Mutation: {
    createFloor: (parent, args) => {
      const floor = new Floor({
        letter: args.letter,
        spots: args.spots,
      });
      return floor.save();
    },

    updateFloor(parent, { id, letter, spots }) {
      try {
        return Floor.findByIdAndUpdate(id, {
          letter: letter,
          spots: spots,
        }).clone();
      } catch (error) {
        return error;
      }
    },
    deleteFloor(parents, { id }) {
      return Floor.findByIdAndRemove(id);
    },
  },
};
