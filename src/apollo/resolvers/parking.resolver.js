const Parking = require("../../models/parking.model");

module.exports = {
  Query: {
    getParkings: () => {
      return Parking.find()
        .populate("floors")
        .clone()
        .catch((err) => console.log(err));
    },
    getParking: (parent, args, context) => {
      return Parking.findById(args.id)
        .populate("floors")
        .clone()
        .catch((err) => console.log(err));
    },
  },

  Mutation: {
    createParking: (parent, args) => {
      const parking = new Parking({
        name: args.name,
        floors: args.floors,
      });
      return parking.save();
    },

    updateParking(parent, { id, name, floors }) {
      try {
        return Parking.findByIdAndUpdate(id, {
          name: name,
          floors: floors,
        }).clone();
      } catch (error) {
        return error;
      }
    },
    deleteParking(parents, { id }) {
      return Parking.findByIdAndRemove(id);
    },
  },
};
