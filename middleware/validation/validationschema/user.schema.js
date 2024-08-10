const joi = require("@hapi/joi");

const schema = {
  signup: joi.object({
    name: joi.string().max(100).required().min(1),
    email: joi.string().email().max(100).required().min(1),
    password: joi.string().required().min(1),
  }),
  login: joi.object({
    email: joi.string().email().required().min(1),
    password: joi.string().required().min(1),
  }),
};

module.exports = schema;
