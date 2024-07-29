'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import DataTable from '@/components/DataTable';
import ProductFilters from '@/components/ProductFilters';
import Pagination from '@/components/Pagination';

const ProductsPage = () => {
  const { pageSize, currentPage, setCurrentPage } = useAppContext();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'https://dummyjson.com/products';
        if (activeTab === 'LAPTOPS') {
          url = 'https://dummyjson.com/products/category/laptops';
        }
        const params = {
          limit: pageSize,
          skip: (currentPage - 1) * pageSize,
        };
        const response = await axios.get(url, { params });
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / pageSize));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [pageSize, currentPage, activeTab]);

  const columns = [
    { header: 'Title', key: 'title' },
    { header: 'Description', key: 'description' },
    { header: 'Price', key: 'price' },
    { header: 'Discount', key: 'discountPercentage' },
    { header: 'Rating', key: 'rating' },
    { header: 'Stock', key: 'stock' },
    { header: 'Brand', key: 'brand' },
    { header: 'Category', key: 'category' }
  ];

  const handleFilter = (field, value) => {
    const filtered = products.filter(product =>
      product[field.toLowerCase()]?.toString().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      Object.values(product).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-4 py-2 rounded ${
            activeTab === 'ALL'
              ? 'bg-blue text-black'
              : 'bg-white dark:bg-gray-800 text-black dark:text-white'
          }`}
        >
          ALL
        </button>
        <button
          onClick={() => setActiveTab('LAPTOPS')}
          className={`px-4 py-2 rounded ${
            activeTab === 'LAPTOPS'
              ? 'bg-blue text-black'
              : 'bg-white dark:bg-gray-800 text-black dark:text-white'
          }`}
        >
          Laptops
        </button>
      </div>
      <ProductFilters onFilter={handleFilter} onSearch={handleSearch} />
      <DataTable data={filteredProducts} columns={columns} />
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default ProductsPage;