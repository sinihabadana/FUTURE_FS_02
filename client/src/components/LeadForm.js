import { useState } from "react";
import axios from "axios";

function LeadForm({ setRefresh }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    source: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/leads/add", form);
      alert("Lead Added!");
      setForm({ name: "", email: "", source: "" });
      setRefresh(prev => !prev); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Lead</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="source"
        placeholder="Source"
        value={form.source}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default LeadForm;