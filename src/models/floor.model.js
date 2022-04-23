const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const floorSchema = new Schema({
  letter: String,
  spots: [{ type: Schema.Types.ObjectId, ref: "Spot" }]
});

module.exports = mongoose.model("Floor", floorSchema);
