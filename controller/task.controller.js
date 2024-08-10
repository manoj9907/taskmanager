const Task = require("../modules/task.schema");

exports.create = async (req, res) => {
  console.log("Create Task API called");

  const task = new Task({
    ...req.body,
    user: req.user._id,
  });

  try {
    await task.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (err) {
    console.error("Error creating task:", err);

    if (err.name === "ValidationError") {
      const errors = Object.keys(err.errors).map((key) => ({
        field: key,
        message: err.errors[key].message,
      }));
      return res.status(400).json({
        success: false,
        message: "Task creation failed due to validation errors",
        errors: errors,
      });
    }
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the task",
      error: err.message,
    });
  }
};

exports.get = async (req, res) => {
  console.log("get");

  try {
    const tasks = await Task.find({ user: req.user._id }).populate(
      "user",
      "name email"
    );

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);

    res.status(500).json({
      success: false,
      message: "An error occurred while fetching tasks",
      error: err.message,
    });
  }
};

exports.update = async (req, res) => {
  console.log("Update Task API called");

  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid updates! Only title, description, and completed can be updated.",
    });
  }

  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.taskId,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (err) {
    console.error("Error updating task:", err);

    res.status(500).json({
      success: false,
      message: "An error occurred while updating the task",
      error: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  console.log("Delete Task API called");

  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (err) {
    console.error("Error deleting task:", err);

    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the task",
      error: err.message,
    });
  }
};
