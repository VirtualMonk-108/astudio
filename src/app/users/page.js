'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import DataTable from '@/components/DataTable';
import Filters from '@/components/Filters';
import Pagination from '@/components/Pagination';

const UsersPage = () => {
  const { pageSize, searchTerm, currentPage } = useAppContext();
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users`, {
          params: { limit: pageSize, skip: (currentPage - 1) * pageSize },
        });
        setUsers(response.data.users);
        setTotalPages(Math.ceil(response.data.total / pageSize));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [pageSize, currentPage]);

  const columns = ['FirstName', 'LastName', 'Age', 'Gender', 'Email', 'Phone', 'Username', 'BloodGroup', 'EyeColor'];

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Filters onFilter={() => {}} />
      <DataTable data={filteredUsers} columns={columns} />
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default UsersPage;