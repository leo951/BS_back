const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotSchema = new Schema({
  number: String,
  available: Boolean
});

module.exports = mongoose.model("Spot", spotSchema);
