const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const listSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  title: { type: String, require: true },
  content: { type: String, required: true },
});

const List = mongoose.model("List", listSchema);
module.exports = List;
