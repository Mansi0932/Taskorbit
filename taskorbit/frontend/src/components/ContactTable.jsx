export default function ContactTable({ contacts }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="min-w-full bg-gray-900 text-sm text-left text-white">
        <thead className="bg-gray-800 text-gray-300 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-4 py-3">First Name</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {contacts.length > 0 ? (
            contacts.map((c, i) => (
              <tr key={i} className="hover:bg-gray-800">
                <td className="px-4 py-2">{c.firstname}</td>
                <td className="px-4 py-2">{c.phone}</td>
                <td className="px-4 py-2">{c.notes}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
                No contacts assigned.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
