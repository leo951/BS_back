const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: {type: String},
  img: {type: String},
  parkings: [{ type: Schema.Types.ObjectId, ref: "Parking" }],
});

module.exports = mongoose.model('City', citySchema)