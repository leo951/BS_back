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

    async updateFloor(parent, { id, letter, spots }) {
      try {
        return await Floor.findByIdAndUpdate(id, {
          letter: letter,
          spots: spots,
        }, {new: true}).clone();
      } catch (error) {
        return error;
      }
    },
    async deleteFloor(parents, { id }) {
      return await Floor.findByIdAndRemove(id);
    },
  },
};
