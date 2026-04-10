import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ refresh }) {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [notesData, setNotesData] = useState({});
  const fetchLeads = async () => {
    const res = await axios.get("http://localhost:5000/api/leads");
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, [refresh]);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/leads/${id}`, { status });
    fetchLeads();
  };
  
   const updateNotes = async (id, notes) => {
        await axios.put(`http://localhost:5000/api/leads/${id}`, { notes });
        fetchLeads();
        // setNotesData((prev) => ({ ...prev, [id]: "" }));
    };
  return (
  <div>
    <h2>Leads Dashboard</h2>

    {/* 🔍 Search + Filter */}
    <div className="filters">
        <input
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="converted">Converted</option>
        </select>
    </div>

    <div className="dashboard">
      {leads
        .filter((lead) => {
          return (
            lead.name.toLowerCase().includes(search.toLowerCase()) ||
            lead.email.toLowerCase().includes(search.toLowerCase())
          );
        })
        .filter((lead) => {
          return statusFilter === "" || lead.status === statusFilter;
        })
        .map((lead) => (
          <div className="card" key={lead._id}>
            <p><b>Name:</b> {lead.name}</p>
            <p><b>Email:</b> {lead.email}</p>
            <p><b>Source:</b> {lead.source}</p>

            <p className={lead.status}>
              <b>Status:</b> {lead.status}
            </p>

            <button onClick={() => updateStatus(lead._id, "contacted")}>
              Contacted
            </button>

            <button onClick={() => updateStatus(lead._id, "converted")}>
              Converted
            </button>

             {/* 📝 Notes */}
            <textarea
                placeholder="Add notes..."
                value={notesData[lead._id] ?? lead.notes ?? ""}
                onChange={(e) =>
                    setNotesData({
                    ...notesData,
                    [lead._id]: e.target.value
                    })
                }
            />

            <button onClick={() => updateNotes(lead._id, notesData[lead._id])}>
                Save Notes
            </button>
          </div>
        ))}
    </div>
  </div>
);
}

export default Dashboard;