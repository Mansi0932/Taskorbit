const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createAgent = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const agent = new User({ name, email, phone, password: hashed, role: 'agent' });
  await agent.save();
  res.json(agent);
};

exports.listAgents = async (req, res) => {
  const agents = await User.find({ role: 'agent' });
  res.json(agents);
};