const User = require("../modules/user.module");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  console.log("Received signup request");

  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ error: "Email and password are required" });
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).send({ error: "Email already in use" });
    }

    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).send({ user, token });
  } catch (err) {
    console.error("Error during user signup:", err);
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .send({ error: "Invalid data", details: err.message });
    }
    if (err.code === 11000) {
      return res
        .status(409)
        .send({ error: "Duplicate key error", details: err.keyValue });
    }
    res.status(500).send({ error: "An unexpected error occurred" });
  }
};

exports.login = async (req, res) => {
  console.log("Received login request");

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Invalid login credentials." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid login password." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.send({ user, token });
  } catch (err) {
    console.error("Error during login:", err);
    res
      .status(500)
      .send({ error: "An unexpected error occurred. Please try again later." });
  }
};
