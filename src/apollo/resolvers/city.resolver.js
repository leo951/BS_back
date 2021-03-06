const City = require("../../models/city.model");

module.exports = {
  Query: {
    getCities: () => {
      return City.find()
        .populate("parkings")
        .clone()
        .catch((err) => console.log(err));
    },
    getCity: (parent, args, context) => {
      return City.findById(args.id)
        .populate("parkings")
        .clone()
        .catch((err) => console.log(err));
    },
  },

  Mutation: {
    createCity: (parent, args) => {
      const city = new City({
        name: args.name,
        img: args.img,
        parkings: args.parkings,
      });
      return city.save();
    },

    async updateCity(parent, { id, name, img, parkings }) {
      try {
        return await City.findByIdAndUpdate(id, {
          name: name,
          img: img,
          parkings: parkings,
        }, {new: true}).clone();
      } catch (error) {
        return error;
      }
    },
    async deleteCity(parents, { id }) {
      return await City.findByIdAndRemove(id);
    },
  },
};
