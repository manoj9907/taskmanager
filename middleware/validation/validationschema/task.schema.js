const joi = require("@hapi/joi");

const schema = {
  create: joi.object({
    title: joi.string().min(1).required(),
    description: joi.string().min(1).required(),
    completed: joi.boolean().optional(),
  }),
  update: joi.object({
    title: joi.string().min(1).optional(),
    description: joi.string().min(1).optional(),
    completed: joi.boolean().optional(),
  }),
};

module.exports = schema;
