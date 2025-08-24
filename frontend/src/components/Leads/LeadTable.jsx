import React, { useMemo, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';

// Register all community features

import StatusBadge from './StatusBadge';
import SourceBadge from './SourceBadge';
import ScoreBar from './ScoreBar';

ModuleRegistry.registerModules([AllCommunityModule]);

const LeadTable = ({ leads, pagination, filters, loading, onDelete, onPageChange, onFilterChange }) => {
  const gridRef = useRef();
  const columnDefs = useMemo(() => [
    { headerName: 'Name', valueGetter: (params) => `${params.data.first_name} ${params.data.last_name}`, width: 160, pinned: 'left' },
    { headerName: 'Email', field: 'email', width: 200, cellRenderer: (params) => <a href={`mailto:${params.value}`} className="text-blue-600 hover:underline">{params.value}</a> },
    { headerName: 'Phone', field: 'phone', width: 140, cellRenderer: (params) => <a href={`tel:${params.value}`} className="text-blue-600 hover:underline">{params.value}</a> },
    { headerName: 'Company', field: 'company', width: 180 },
    { headerName: 'City', field: 'city', width: 120 },
    { headerName: 'Source', field: 'source', width: 120, cellRenderer: (params) => <SourceBadge source={params.value} /> },
    { headerName: 'Status', field: 'status', width: 120, cellRenderer: (params) => <StatusBadge status={params.value} /> },
    { headerName: 'Score', field: 'score', width: 140, cellRenderer: (params) => <ScoreBar score={params.value} /> },
    { headerName: 'Lead Value', field: 'lead_value', width: 120, valueFormatter: (params) => `$${params.value?.toLocaleString()}`, cellClass: 'font-bold text-green-700' },
    { headerName: 'Qualified', field: 'is_qualified', width: 100, cellRenderer: (params) => params.value ? <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div> : <div className="w-3 h-3 bg-gray-300 rounded-full"></div> },
    { headerName: 'Last Activity', field: 'last_activity_at', width: 140, valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : 'Never' },
    { headerName: 'Actions', field: 'actions', width: 140, cellRenderer: (params) => (
      <div>
        <a href={`/leads/edit/${params.data._id}`} className="text-indigo-600 hover:underline mr-2">Edit</a>
        <button onClick={() => onDelete(params.data._id)} className="text-red-600 hover:underline">Delete</button>
      </div>
    )},
  ], [onDelete]);

  // Custom pagination controls
  const totalPages = pagination.totalPages || 1;
  const currentPage = pagination.page || 1;

  // AG Grid options (client-side, but we use server-side pagination)
  const gridOptions = {
    defaultColDef: { sortable: true, filter: true, resizable: true },
    animateRows: true,
    suppressCellFocus: true,
    rowHeight: 55,
    headerHeight: 55,
    domLayout: 'autoHeight',
    onFilterChanged: (params) => {
      const agFilters = params.api.getFilterModel();
      const newFilters = {};
      for (const key in agFilters) {
        const filter = agFilters[key];
        if (filter.filter) newFilters[key] = filter.filter;
      }
      onFilterChange(newFilters);
    },
  };

  // Pagination handler
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // Render pagination controls
  const renderPagination = () => (
    <div className="flex justify-end items-center gap-2 mt-4">
      <button
        className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >Prev</button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'} font-semibold`}
          onClick={() => handlePageChange(i + 1)}
        >{i + 1}</button>
      ))}
      <button
        className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >Next</button>
    </div>
  );

  return (
    <div className="w-full h-full">
      <div className="ag-theme-alpine h-[650px] border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <AgGridReact
          ref={gridRef}
          rowData={leads}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
          theme='legacy'
        />
      </div>
      {renderPagination()}
    </div>
  );
};

export default LeadTable;
