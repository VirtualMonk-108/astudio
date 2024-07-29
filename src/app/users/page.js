'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import DataTable from '@/components/DataTable';
import UserFilters from '@/components/UserFilters';
import Pagination from '@/components/Pagination';

const UsersPage = () => {
  const { pageSize, currentPage, setCurrentPage } = useAppContext();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users', {
          params: { limit: pageSize, skip: (currentPage - 1) * pageSize },
        });
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
        setTotalPages(Math.ceil(response.data.total / pageSize));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [pageSize, currentPage]);

  const columns = [
    { header: 'First Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'Age', key: 'age' },
    { header: 'Gender', key: 'gender' },
    { header: 'Email', key: 'email' },
    { header: 'Phone', key: 'phone' },
    { header: 'Username', key: 'username' },
    { header: 'Blood Group', key: 'bloodGroup' },
    { header: 'Eye Color', key: 'eyeColor' }
  ];

  const handleFilter = (field, value) => {
    const filtered = users.filter(user => {
      const fieldValue = user[field.toLowerCase()];
      return fieldValue !== undefined && fieldValue !== null && 
             fieldValue.toString().toLowerCase().includes(value.toLowerCase());
    });
    setFilteredUsers(filtered);
  };

  const handleSearch = (searchTerm) => {
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        value !== undefined && value !== null &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UserFilters onFilter={handleFilter} onSearch={handleSearch} />
      <DataTable data={filteredUsers} columns={columns} />
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default UsersPage;