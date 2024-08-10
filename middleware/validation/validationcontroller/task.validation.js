const { create, update } = require("../validationschema/task.schema");

let taskCreateValidation = async (req, res, next) => {
  let value = await create.validate(req.body);
  if (value.error) {
    res.json({
      success: false,
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};

let taskUpdateValidation = async (req, res, next) => {
  console.log("30");
  let value = await update.validate(req.body);
  if (value.error) {
    res.json({
      success: false,
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = {
  taskUpdateValidation,
  taskCreateValidation,
};
