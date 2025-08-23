import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeadForm from "../components/Leads/LeadForm";
import { getLead, updateLead } from "../api/leads";

const LeadEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    getLead(id)
      .then((res) => setLead(res.data))
      .catch(console.error);
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await updateLead(id, data);
      alert("Lead updated!");
      navigate("/leads");
    } catch (err) {
      console.error(err);
      alert("Error updating lead");
    }
  };

  return (
    <div>
      <h2>Edit Lead</h2>
      {lead ? (
        <LeadForm initialValues={lead} onSubmit={handleSubmit} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LeadEditPage;
