const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const projectnameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Projectname = mongoose.model("Projectname", projectnameSchema);

function validateName(projectname) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
  });

  return schema.validate(projectname);
}

exports.Projectname = Projectname;
exports.validateName = validateName;
