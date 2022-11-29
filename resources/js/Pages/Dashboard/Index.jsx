import React from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Dashboard = () => {
  return (
      <AuthenticatedLayout>
          <Head title="Dashboard" />

          <div className="flex justify-between items-center border-b border-gray-300">
              <h1 className="text-2xl font-semibold pt-2 pb-6">Dashboard</h1>
          </div>

          <p className="mt-4 mb-12 leading-normal">
              Hey there! Welcome to Ping CRM, a demo app designed to help
              illustrate how
              <a
                  className="mx-1 text-indigo-600 underline hover:text-orange-500"
                  href="https://inertiajs.com"
              >
                  Inertia.js
              </a>
              works with
              <a
                  className="ml-1 text-indigo-600 underline hover:text-orange-500"
                  href="https://reactjs.org/"
              >
                  React
              </a>
              .
          </p>
          <div>
              <Link className="mr-1 btn-indigo" href="/500">
                  500 error
              </Link>
              <Link className="btn-indigo" href="/404">
                  404 error
              </Link>
          </div>
      </AuthenticatedLayout>
  );
};

export default Dashboard;
