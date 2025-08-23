import { useEffect, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { getLeads, deleteLead } from '../../api/leads';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { format } from 'date-fns';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({}); // store filter values

  const fetchLeads = useCallback(async (page = 1, limit = 20, appliedFilters = {}) => {
    setLoading(true);
    try {
      const res = await getLeads({ page, limit, ...appliedFilters });
      setLeads(res.data.data);
      setPagination({
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total,
        totalPages: res.data.totalPages
      });
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchLeads(pagination.page, pagination.limit, filters); }, [fetchLeads, filters, pagination.page, pagination.limit]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      await deleteLead(id);
      fetchLeads(pagination.page, pagination.limit, filters);
    }
  };

  const columns = [
    { headerName: 'Name', field: 'first_name', valueGetter: (params) => `${params.data.first_name} ${params.data.last_name}` },
    { headerName: 'Email', field: 'email', filter: true },
    { headerName: 'Phone', field: 'phone' },
    { headerName: 'Company', field: 'company', filter: true },
    { headerName: 'City', field: 'city', filter: true },
    { headerName: 'Source', field: 'source', filter: true },
    { headerName: 'Status', field: 'status', filter: true },
    { headerName: 'Score', field: 'score', filter: 'agNumberColumnFilter' },
    { headerName: 'Lead Value', field: 'lead_value', filter: 'agNumberColumnFilter' },
    { headerName: 'Last Activity', field: 'last_activity_at', valueFormatter: (params) => params.value ? format(new Date(params.value), 'yyyy-MM-dd') : '-', filter: 'agDateColumnFilter' },
    { headerName: 'Qualified', field: 'is_qualified', filter: true, valueFormatter: (params) => params.value ? 'Yes' : 'No' },
    { headerName: 'Actions', field: 'actions', cellRendererFramework: (params) => (
      <div>
        <a href={`/leads/edit/${params.data._id}`} style={{ marginRight: 8 }}>Edit</a>
        <button onClick={() => deleteHandler(params.data._id)}>Delete</button>
      </div>
    )}
  ];

  const onFilterChanged = (params) => {
    const agFilters = params.api.getFilterModel();
    const newFilters = {};
    for (const key in agFilters) {
      const filter = agFilters[key];
      if (filter.filter) newFilters[key] = filter.filter; // simple string/number filters
    }
    setFilters(newFilters);
  };

  console.log('Leads:', leads);
  

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={leads}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={pagination.limit}
        onPaginationChanged={(params) => {
          if (params.api) {
            const currentPage = params.api.paginationGetCurrentPage() + 1;
            fetchLeads(currentPage, pagination.limit, filters);
          }
        }}
        onFilterChanged={onFilterChanged}
      />
    </div>
  );
};

export default LeadList;
