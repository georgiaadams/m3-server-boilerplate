const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
  item: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Item = mongoose.model("Item", itemsSchema);
module.exports = Item;
