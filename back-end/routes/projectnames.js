const express = require("express");
const _ = require("lodash");
const { Projectname, validateName } = require("../models/projectname");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const projectname = await Projectname.find({});
  res.send(projectname);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateName(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let projectname = new Projectname({
    name: req.body.name,
    user_id: req.user._id,
  });

  post = await projectname.save();
  res.send(post);
});

module.exports = router;
