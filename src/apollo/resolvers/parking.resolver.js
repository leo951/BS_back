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

    async updateParking(parent, { id, name, floors }) {
      try {
        return await Parking.findByIdAndUpdate(id, {
          name: name,
          floors: floors,
        }, {new: true}).clone();
      } catch (error) {
        return error;
      }
    },
    async deleteParking(parents, { id }) {
      return await Parking.findByIdAndRemove(id);
    },
  },
};
