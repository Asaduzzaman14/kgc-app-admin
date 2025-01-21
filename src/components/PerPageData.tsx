import React, { useState } from 'react';

const PerPageData = ({ perPage, setparePage }: any) => {
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setparePage(Number(event.target.value));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {/* Per Page Select Box */}
        <div>
          <label htmlFor="perPage" className="mr-2 font-medium">
            Rows per page:
          </label>
          <select
            id="perPage"
            value={perPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 rounded-md px-3 py-1"
          >
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PerPageData;
