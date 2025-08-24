import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { getLeads, deleteLead } from "../../api/leads";
import LeadTable from "./LeadTable";

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  // Only fetch leads on mount and when page/filter changes
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const res = await getLeads({
          page: pagination.page,
          limit: pagination.limit,
          ...filters,
        });
        setLeads(res.data.data);
        setPagination({
          page: res.data.page,
          limit: res.data.limit,
          total: res.data.total,
          totalPages: res.data.totalPages,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [pagination.page, pagination.limit, filters]);

  // Listen for filter changes from filters section
  useEffect(() => {
    const handler = (e) => {
      setPagination((prev) => ({ ...prev, page: 1 }));
      setFilters(e.detail);
    };
    window.addEventListener("lead-filters", handler);
    return () => window.removeEventListener("lead-filters", handler);
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await deleteLead(id);
        toast.success("Lead deleted successfully!");
        // refetch leads after delete
        const res = await getLeads({
          page: pagination.page,
          limit: pagination.limit,
          ...filters,
        });
        setLeads(res.data.data);
        setPagination({
          page: res.data.page,
          limit: res.data.limit,
          total: res.data.total,
          totalPages: res.data.totalPages,
        });
      } catch (err) {
        toast.error("Error deleting lead");
      }
    }
  };

  // AG Grid filter model to backend query params
  const handleFilterChange = (agFilters) => {
    // Only pass AG Grid filter values as backend query params
    // No client-side filtering
    setPagination((prev) => ({ ...prev, page: 1 }));
    setFilters(agFilters);
  };

  return (
    <div>
      <Toaster position="top-right" />
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-blue-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="text-blue-600 font-semibold">Loading...</span>
          </div>
        </div>
      )}
      <div className="mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
          Leads Overview
        </h2>
        <p className="text-gray-600 text-sm font-medium">
          Manage and track your sales pipeline with detailed lead information
        </p>
      </div>
      <div className="mb-6">
        <div className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-4 items-center">
          <input
            className="border rounded px-3 py-2"
            placeholder="Email"
            id="filter-email"
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Company"
            id="filter-company"
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="City"
            id="filter-city"
          />
          <select className="border rounded px-3 py-2" id="filter-status">
            <option value="">Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <select className="border rounded px-3 py-2" id="filter-source">
            <option value="">Source</option>
            <option value="website">Website</option>
            <option value="facebook_ads">Facebook Ads</option>
            <option value="google_ads">Google Ads</option>
            <option value="referral">Referral</option>
            <option value="events">Events</option>
            <option value="other">Other</option>
          </select>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
            onClick={() => {
              // Collect filter values and pass to LeadList
              const filters = {};
              const email = document.getElementById("filter-email").value;
              const company = document.getElementById("filter-company").value;
              const city = document.getElementById("filter-city").value;
              const status = document.getElementById("filter-status").value;
              const source = document.getElementById("filter-source").value;
              if (email) filters.email = email;
              if (company) filters.company = company;
              if (city) filters.city = city;
              if (status) filters.status = status;
              if (source) filters.source = source;
              window.dispatchEvent(
                new CustomEvent("lead-filters", { detail: filters })
              );
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>

      <LeadTable
        leads={leads}
        pagination={pagination}
        filters={filters}
        loading={loading}
        onDelete={deleteHandler}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default LeadList;
