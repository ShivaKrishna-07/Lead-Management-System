
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeadForm from "../components/Leads/LeadForm";
import { getLead, updateLead } from "../api/leads";
import { Pencil } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <div className="flex items-center gap-2 mb-6">
          <Pencil className="text-yellow-600" />
          <h2 className="text-2xl font-bold text-gray-800">Edit Lead</h2>
        </div>
        {lead ? (
          <LeadForm initialValues={lead} onSubmit={handleSubmit} />
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default LeadEditPage;
