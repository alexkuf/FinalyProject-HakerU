const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const cardSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  employeeName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  createAt: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  stopTime: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  actions: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  revision: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Card = mongoose.model("Card", cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    projectName: Joi.string().min(2).max(255).required(),
    employeeName: Joi.string().min(2).max(255).required(),
    createAt: Joi.string().min(2).max(400).required(),
    startTime: Joi.string().min(2).max(255),
    stopTime: Joi.string().min(2).max(255),
    actions: Joi.string().min(2).max(255),
    revision: Joi.string().min(2).max(255),
  });

  return schema.validate(card);
}

exports.Card = Card;
exports.validateCard = validateCard;
