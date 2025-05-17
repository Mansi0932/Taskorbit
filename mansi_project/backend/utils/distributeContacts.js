module.exports = function distributeContacts(data, agents) {
  const chunks = Array.from({ length: agents.length }, () => []);

  data.forEach((entry, idx) => {
    const i = idx % agents.length;
    chunks[i].push({
      firstname: entry.firstname,
      phone: entry.phone,
      notes: entry.notes
    });
  });

  // Flatten and return contacts with agent assignment (done in controller)
  return chunks.flat();
};