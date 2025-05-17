import { useState, useEffect } from "react";
import {
  getAgents,
  createAgent,
  uploadContacts,
  getContactsByAgentId,
} from "../services/api";
import { useAuth } from "../context/AuthContext";

function ContactsModal({ agent, contacts, onClose }) {
  if (!agent) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="bg-gray-900 text-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-auto">
        <h3 className="text-xl font-semibold mb-4">{agent.name}'s Contacts</h3>
        {contacts.length === 0 ? (
          <p>No contacts assigned.</p>
        ) : (
          <ul className="space-y-2">
            {contacts.map((contact) => (
              <li key={contact._id} className="border-b border-gray-700 pb-2">
                <p>
                  <strong>{contact.firstname}</strong>
                </p>
                <p>{contact.phone}</p>
                <p className="text-gray-400">{contact.notes}</p>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [agents, setAgents] = useState([]);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentContacts, setAgentContacts] = useState([]);
  const { user, logout } = useAuth();

  async function fetchAgents() {
    const data = await getAgents();
    setAgents(data);
  }

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    try {
      await createAgent(form);
      alert("Agent created");
      setForm({ name: "", email: "", phone: "", password: "" });
      const updatedAgents = await getAgents();
      setAgents(updatedAgents);
    } catch (err) {
      alert("Failed to create agent");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file");
    try {
      await uploadContacts(file);
      alert("Uploaded successfully");
      fetchAgents(); // <-- refresh agents list here
    } catch {
      alert("Upload failed");
    }
  };

  const openAgentContacts = async (agent) => {
    try {
      const contacts = await getContactsByAgentId(agent._id);
      setAgentContacts(contacts);
      setSelectedAgent(agent);
    } catch {
      alert("Failed to load contacts");
    }
  };

  const closeModal = () => {
    setSelectedAgent(null);
    setAgentContacts([]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow">
          <p className="text-lg font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow space-y-4">
          <h2 className="text-xl font-semibold">Create Agent</h2>
          <form
            onSubmit={handleCreateAgent}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-gray-800 p-2 rounded"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-gray-800 p-2 rounded"
            />
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="bg-gray-800 p-2 rounded"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-gray-800 p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 p-2 rounded text-white col-span-full"
            >
              Create Agent
            </button>
          </form>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow space-y-4">
          <h2 className="text-xl font-semibold">Upload Contacts</h2>
          <input
            type="file"
            accept=".csv,.xls,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="bg-gray-800 p-2 rounded"
          />
          <button
            onClick={handleUpload}
            className="bg-green-600 hover:bg-green-700 p-2 rounded text-white"
          >
            Upload & Distribute
          </button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-4">Agents List</h2>
          <ul className="space-y-2">
            {agents.map((agent) => (
              <li
                key={agent._id}
                className="text-gray-300 cursor-pointer hover:text-blue-400"
                onClick={() => openAgentContacts(agent)}
              >
                {agent.name} — {agent.email} — Assigned Contacts:{" "}
                {agent.contactCount || 0}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contacts Popup Modal */}
      {selectedAgent && (
        <ContactsModal
          agent={selectedAgent}
          contacts={agentContacts}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
