import { useState } from "react";
import LeadForm from "./components/LeadForm";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [refresh, setRefresh] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
  <div className="container">

    {/* Header */}
    <div className="header">
      <h1>Mini CRM System</h1>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>

    {/* Form */}
    <div className="section" style={{ display: "flex", justifyContent: "center" }}>
      <LeadForm setRefresh={setRefresh} />
    </div>

    <hr />

    {/* Dashboard */}
    <div className="section">
      <Dashboard refresh={refresh} />
    </div>

  </div>
);
}

export default App;