import React from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-grey font-neutra-text">
      <nav className="bg-black text-white p-4">
        <ul className="flex space-x-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/users">Users</Link></li>
          <li><Link href="/products">Products</Link></li>
        </ul>
      </nav>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;