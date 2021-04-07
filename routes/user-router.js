const express = require("express");
const router = express.Router();
const List = require("../models/list-model.js");
const mongoose = require("mongoose");

router.get("/lists", async (req, res, next) => {
  try {
    const allTodos = await List.find();
    res.json(allTodos);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
});

router.post("/lists/new", (req, res, next) => {
  const { date, title, content } = req.body;
  List.create({ date, title, content })
    .then((newList) => {
      res.status(201).json(newList);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/lists/:id", (req, res, next) => {
  const { id } = req.params;
  const { date, title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  List.findByIdAndUpdate(id, { date, title, content }, { new: true })
    .then((updatedList) => {
      res.status(200).json(updatedList);
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

// router.get("/foodsearch", async (req, res, next) => {});

// router.get("/foodsearch/info", async (req, res, next) => {});

module.exports = router;
