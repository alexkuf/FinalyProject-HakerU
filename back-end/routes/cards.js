const express = require("express");
const _ = require("lodash");
const { Card, validateCard } = require("../models/card");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  if (!req) {
    res.status(401).send("Access Denied");
    return;
  }

  const cards = await Card.find({});
  res.send(cards);
});

router.delete("/:id", auth, async (req, res) => {
  const card = await Card.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
});

router.put("/:id", auth, async (req, res) => {
  // const { error } = validateCard(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let card = await Card.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user._id },
    req.body
  );
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");

  card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(card);
});

router.get("/:id", auth, async (req, res) => {
  const card = await Card.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = new Card({
    projectName: req.body.projectName,
    employeeName: req.body.employeeName,
    createAt: req.body.createAt,
    startTime: req.body.startTime,
    stopTime: req.body.stopTime ? req.body.stopTime : null,
    actions: req.body.actions,
    revision: req.body.revision,
    user_id: req.user._id,
  });

  post = await card.save();
  res.send(post);
});

module.exports = router;
