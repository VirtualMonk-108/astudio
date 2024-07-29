'use client'

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const Layout = ({ children }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-grey dark:bg-black font-neutra-text">
      <nav className="bg-black dark:bg-grey text-white dark:text-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/users">Users</Link></li>
            <li><Link href="/products">Products</Link></li>
          </ul>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-yellow text-black"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>
      <main className="container mx-auto p-4 text-black dark:text-white">
        {children}
      </main>
    </div>
  );
};

export default Layout;