import React from "react";
import { useNavigate } from "react-router-dom";
import LeadList from "../components/Leads/LeadList";
import { useAuth } from "../hooks/useAuth";

const LeadsPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleCreate = () => {
    navigate("/leads/create");
  };

  return (
    <div style={{ padding: "20px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Leads</h2>
        <div>
          <button onClick={handleCreate} style={{ marginRight: 10 }}>
            + Create Lead
          </button>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <LeadList />
    </div>
  );
};

export default LeadsPage;
