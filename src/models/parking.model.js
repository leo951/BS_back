const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parkingSchema = new Schema({
  name: String,
  floors: [{ type: Schema.Types.ObjectId, ref: "Floor" }]
});

module.exports = mongoose.model('Parking', parkingSchema)