import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const Filters = ({ onFilter }) => {
  const { pageSize, setPageSize, setSearchTerm } = useAppContext();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="mb-4 flex items-center space-x-4">
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="border p-2 rounded"
      >
        {[5, 10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <button
        onClick={() => setShowSearch(!showSearch)}
        className="p-2 bg-blue text-black rounded"
      >
        Search
      </button>

      {showSearch && (
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
          placeholder="Search..."
        />
      )}
    </div>
  );
};

export default Filters;