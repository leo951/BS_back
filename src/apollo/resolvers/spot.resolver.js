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

    async createSpots(parent, args) {
      for (let i = 0; i < parseInt(args.number); i++) {
        try {
          const spot = new Spot({
            number: JSON.stringify(i),
            available: args.available,
          });
          console.log("Je suis spot = ",spot);
          await spot.save();
        } catch (error) {
          break
        }

      }
    },

    async updateSpot(parent, { id, number, available }) {
      console.log(`Je suis id = ${id} --- Je suis number = ${number} --- Je suis available = ${available}`);
      try {
        return await Spot.findByIdAndUpdate(id, {
          number: number,
          available: available,
        }, {new: true}).clone();
      } catch (error) {
        return error;
      }
    },
    async deleteSpot(parents, { id }) {
      return await Spot.findByIdAndRemove(id);
    },
  },
};
