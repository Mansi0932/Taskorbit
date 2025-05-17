const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password'); // ensure password is included if schema has select: false
    const decrypted = await bcrypt.compare(password, user.password);
    if (!user || !decrypted) {
      return res.status(401).json({ msg: "Invalid credentials" , decrypted});
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { _id, name, email: userEmail, role } = user;

    res.json({
      token,
      role,
      user: {
        id: _id,
        name,
        email: userEmail,
        role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
