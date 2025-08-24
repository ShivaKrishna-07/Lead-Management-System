
import React, { useEffect, useState } from 'react';
import { getLeads, deleteLead } from '../../api/leads';
import LeadTable from './LeadTable';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  // Only fetch leads on mount and when page/filter changes
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const res = await getLeads({ page: pagination.page, limit: pagination.limit, ...filters });
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

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      await deleteLead(id);
      // refetch leads after delete
      const res = await getLeads({ page: pagination.page, limit: pagination.limit, ...filters });
      setLeads(res.data.data);
      setPagination({
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total,
        totalPages: res.data.totalPages,
      });
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
          Leads Overview
        </h2>
        <p className="text-gray-600 text-sm font-medium">
          Manage and track your sales pipeline with detailed lead information
        </p>
      </div>

      <LeadTable
        leads={leads}
        pagination={pagination}
        filters={filters}
        loading={loading}
        onDelete={deleteHandler}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onFilterChange={(newFilters) => setFilters(newFilters)}
      />
    </div>
  );
};

export default LeadList;
