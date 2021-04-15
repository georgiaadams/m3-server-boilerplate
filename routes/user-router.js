const express = require("express");
const router = express.Router();
const List = require("../models/list-model.js");
const mongoose = require("mongoose");
const Item = require("../models/item-model.js");

router.get("/lists", async (req, res, next) => {
  try {
    const allLists = await List.find({});
    res.json(allLists);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);
  }
});

router.post("/lists/new", (req, res, next) => {
  const { date, title, category } = req.body;
  console.log({ date, title, category });
  List.create({ date, title, category })
    .then((newList) => {
      res.status(201).json(newList);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/lists/:id", (req, res, next) => {
  const { item, amount } = req.body;
  const { id } = req.params;
  Item.create({ item, amount })
    .then((newItem) => {
      List.findByIdAndUpdate(
        id,
        { $push: { items: newItem._id } },
        { new: true }
      ).then((addedItems) => res.status(201).json(newItem));
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get("/lists/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
    const oneList = await List.findById(id).populate({
      path: "items",
      model: Item,
    });
    res.json(oneList);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/lists/edit/:id", (req, res, next) => {
  const { id } = req.params;
  const { title, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  List.findByIdAndUpdate(id, { title, category }, { new: true })
    .then((updatedList) => {
      res.status(200).json(updatedList);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

router.put("/items/edit/:id", (req, res, next) => {
  const { id } = req.params;
  const { item, amount } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Item.findByIdAndUpdate(id, { item, amount }, { new: true })
    .then((updatedItem) => {
      res.status(200).json(updatedItem);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

router.delete("/lists/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  List.findByIdAndRemove(id)
    .then(() => {
      res.status(201).send(`Offer ${id} was removed successfully.`);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = router;
