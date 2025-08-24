import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeadList from "../components/Leads/LeadList";
import { useAuth } from "../hooks/useAuth";
import { LogOut, Users, Target, TrendingUp, DollarSign } from "lucide-react";
import { getLeads } from "../api/leads";

const LeadsPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(false);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const res = await getLeads({ page: 1, limit: 20 });
        setLeads(res.data.data || []);
        setTotal(res.data.total || 0);
      } catch (err) {
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const qualifiedLeads = leads.filter((l) => l.is_qualified).length;
  const wonDeals = leads.filter((l) => l.status === "Won").length;
  const totalValue = leads.reduce((sum, l) => sum + (l.lead_value || 0), 0);

  const handleCreate = () => {
    navigate("/leads/create");
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* Navbar */}
      <nav className="bg-white shadow flex items-center justify-between px-8 py-4 mb-8">
        <div className="flex items-center gap-2">
          <Users className="text-blue-600" />
          <span className="text-xl font-bold text-gray-800">
            Lead Management
          </span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </nav>

      <div className="max-w-5xl mx-auto">
        
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Lead Management
              </h1>
              <p className="text-gray-600 mt-1 font-medium">
                Track and manage your sales leads efficiently
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 rounded-lg shadow-sm">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Total Leads
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {total || 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-green-100 to-green-200 p-3 rounded-lg shadow-sm">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Qualified
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {qualifiedLeads}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-3 rounded-lg shadow-sm">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Won Deals
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{wonDeals}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-3 rounded-lg shadow-sm">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Total Value
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${totalValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-lg shadow p-6 mb-2 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Leads</h2>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
          >
            + Create Lead
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <LeadList />
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;
