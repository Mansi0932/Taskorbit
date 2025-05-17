const API = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem("token");

export const login = async (data) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getAgents = async () => {
  const res = await fetch(`${API}/agents`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.json();
};

export const uploadContacts = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API}/contacts/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token()}` },
    body: formData,
  });
  return res.json();
};

export const getMyContacts = async () => {
  const res = await fetch(`${API}/contacts/my`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.json();
};

export const createAgent = async (data) => {
  const res = await fetch(`${API}/agents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create agent');
  }
  return res.json();
};

export const getContactsByAgentId = async (agentId) => {
  const res = await fetch(`${API}/contacts/agent/${agentId}/contacts`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch contacts');
  }
  return res.json();
};
