import React from "react";
import { useNavigate } from "react-router-dom";
import LeadForm from "../components/Leads/LeadForm";
import { createLead } from "../api/leads";

const LeadCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createLead(data);
      alert("Lead created!");
      navigate("/leads");
    } catch (err) {
      console.error(err);
      alert("Error creating lead");
    }
  };

  return (
    <div>
      <h2>Create Lead</h2>
      <LeadForm onSubmit={handleSubmit} />
    </div>
  );
};

export default LeadCreatePage;
