const fs = require("fs");
const xlsx = require("xlsx");
const Contact = require("../models/Contact");
const User = require("../models/User");
const distributeContacts = require("../utils/distributeContacts");
exports.uploadContacts = async (req, res) => {
  try {
    const file = req.file;
    const wb = xlsx.readFile(file.path);
    const data = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

    const agents = await User.find({ role: "agent" });

    const distributed = distributeContacts(data, agents);

    // Prepare contacts with assignedTo references
    const contactsToInsert = distributed.map((entry, i) => ({
      firstname: entry.firstname,
      phone: entry.phone,
      notes: entry.notes,
      assignedTo: agents[i % agents.length]._id,
      uploadedBy: req.user.id,
    }));

    // Insert contacts in bulk
    await Contact.insertMany(contactsToInsert);

    // Update contactCount for each agent
    // Count how many contacts each agent got in this batch
    const contactCountMap = {};
    contactsToInsert.forEach(({ assignedTo }) => {
      contactCountMap[assignedTo] = (contactCountMap[assignedTo] || 0) + 1;
    });

    // Update each agent's contactCount by incrementing current count
    const updatePromises = Object.entries(contactCountMap).map(([agentId, count]) =>
      User.findByIdAndUpdate(agentId, { $inc: { contactCount: count } })
    );
    await Promise.all(updatePromises);

    fs.unlinkSync(file.path);

    res.json({ msg: "Uploaded & distributed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getAgentContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ assignedTo: req.user.id }).select(
      "firstname phone notes"
    );
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

exports.getAgentContactsByAgentId = async (req, res) => {
  try {
    const { agentId } = req.params;
    const contacts = await Contact.find({ assignedTo: agentId }).select(
      "firstname phone notes"
    );
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts for agent" });
  }
};
