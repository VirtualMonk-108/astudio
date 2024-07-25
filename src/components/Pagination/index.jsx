import React from 'react';
import { useAppContext } from '../../context/AppContext';

const Pagination = ({ totalPages }) => {
  const { currentPage, setCurrentPage } = useAppContext();

  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === page ? 'bg-blue text-black' : 'bg-white'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;