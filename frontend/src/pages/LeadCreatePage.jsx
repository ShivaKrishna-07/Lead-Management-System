
import React from "react";
import { useNavigate } from "react-router-dom";
import LeadForm from "../components/Leads/LeadForm";
import { createLead } from "../api/leads";
import { PlusCircle } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <div className="flex items-center gap-2 mb-6">
          <PlusCircle className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Create Lead</h2>
        </div>
        <LeadForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LeadCreatePage;
