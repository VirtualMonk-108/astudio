'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import DataTable from '@/components/DataTable';
import Filters from '@/components/Filters';
import Pagination from '@/components/Pagination';

const ProductsPage = () => {
  const { pageSize, searchTerm, currentPage } = useAppContext();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = activeTab === 'ALL' ? 'https://dummyjson.com/products' : 'https://dummyjson.com/products/category/laptops';
        const response = await axios.get(url, {
          params: { limit: pageSize, skip: (currentPage - 1) * pageSize },
        });
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / pageSize));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [pageSize, currentPage, activeTab]);

  const columns = ['Title', 'Brand', 'Category', 'Price', 'Rating', 'Stock', 'Description'];

  const filteredProducts = products.filter((product) =>
    Object.values(product).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`mr-2 p-2 ${activeTab === 'ALL' ? 'bg-blue' : 'bg-white'}`}
        >
          ALL
        </button>
        <button
          onClick={() => setActiveTab('LAPTOPS')}
          className={`p-2 ${activeTab === 'LAPTOPS' ? 'bg-blue' : 'bg-white'}`}
        >
          Laptops
        </button>
      </div>
      <Filters onFilter={() => {}} />
      <DataTable data={filteredProducts} columns={columns} />
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default ProductsPage;