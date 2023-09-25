const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateUser } = require("../models/user");
const { isAdmin } = require("../middleware/permissions");

const auth = require("../middleware/auth");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.delete("/:id", auth, isAdmin, async (req, res) => {
  const user = await User.findOneAndRemove({
    _id: req.params.id,
  });

  if (!user)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(user);
});

router.post("/", auth, isAdmin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, ["name", "email", "password", "isAdmin", "cards"])
  );
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.get("/user/:user_id", auth, async (req, res) => {
  const profile = await User.findOne({ user: req.user.id }).populate("user", [
    "name",
  ]);
  res.json(profile);
});

router.get("/:id", auth, async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id,
  });
  res.send(user);
});

router.get("/", auth, isAdmin, async (req, res) => {
  if (!req) {
    res.status(401).send("Access Denied");
    return;
  }
  const users = await User.find({});
  res.send(users);
});

router.put("/:id", auth, isAdmin, async (req, res) => {
  let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
  if (!user) return res.status(404).send("No user found on db.");
  user = await User.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(user);
});

router.put("/refresh-password/:id", auth, isAdmin, async (req, res) => {
  let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
  if (!user) return res.status(404).send("No user found on db.");
  user = await User.findOne({ _id: req.params.id, user_id: req.user._id });
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(user);
});
module.exports = router;
