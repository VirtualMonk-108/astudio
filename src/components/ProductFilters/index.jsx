import React, { useState } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { useAppContext } from '../../context/AppContext';

const ProductFilters = ({ onFilter, onSearch }) => {
  const { pageSize, setPageSize } = useAppContext();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  const handleFilterClick = (filter) => {
    setActiveFilter(activeFilter === filter ? '' : filter);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="flex items-center space-x-4">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <div className="flex items-center">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 bg-blue text-black rounded flex items-center"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
          {showSearch && (
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="ml-2 border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
              placeholder="Search..."
            />
          )}
        </div>

        {['Title', 'Brand', 'Category'].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`p-2 rounded flex items-center ${
              activeFilter === filter ? 'bg-blue text-black' : 'bg-white dark:bg-gray-800 text-black dark:text-white'
            }`}
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 mr-1" />
            {filter}
          </button>
        ))}
      </div>

      {activeFilter && (
        <div className="flex items-center space-x-2">
          <label>{activeFilter}:</label>
          <input
            type="text"
            onChange={(e) => onFilter(activeFilter, e.target.value)}
            className="border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholder={`Filter by ${activeFilter}`}
          />
        </div>
      )}
    </div>
  );
};

export default ProductFilters;