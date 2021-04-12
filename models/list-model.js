const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ["food", "holiday", "christmas", "birthday", "other"],
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "item",
    },
  ],
});

const List = mongoose.model("List", listSchema);
module.exports = List;
