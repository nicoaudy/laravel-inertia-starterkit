import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import FlashMessages from '@/Components/FlashMessages';

export default function AuthenticatedLayout({ children }) {
  const { app_name } = usePage().props;
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex relative">
      <Sidebar navOpen={navOpen} appName={app_name} />
      <main className="flex-1 h-screen overflow-y-scroll overflow-x-hidden bg-gray-100">
        <div className="md:hidden justify-between items-center bg-black text-white flex">
          <h1 className="text-2xl font-bold px-4">{app_name}</h1>
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="btn p-4 focus:outline-none hover:bg-gray-800"
          >
            <svg
              className="w-6 h-6 fill-current"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <section className="max-w-7xl mx-auto py-4 px-5">
          <FlashMessages />
          {children}
        </section>
      </main>
    </div>
  );
}
