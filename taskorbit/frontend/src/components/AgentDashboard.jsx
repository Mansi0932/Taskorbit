import { useEffect, useState } from 'react';
import { getMyContacts } from '../services/api';
import ContactTable from './ContactTable';
import { useAuth } from '../context/AuthContext';

export default function AgentDashboard() {
  const [contacts, setContacts] = useState([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    getMyContacts().then(setContacts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
          <h1 className="text-3xl font-bold">Agent Dashboard</h1>
          <button onClick={logout} className="text-sm text-red-400 hover:text-red-300">Logout</button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
          <div className="text-sm text-gray-500">
            Assigned Contacts: <span className="text-white font-semibold">{contacts.length}</span>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Your Assigned Contacts</h2>
          <ContactTable contacts={contacts} />
        </div>
      </div>
    </div>
  );
}
