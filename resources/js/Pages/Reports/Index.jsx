import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = () => {
  return (
    <AuthenticatedLayout>
      <Head title="Reports" />
      <h1 className="mb-8 text-3xl font-bold">Reports</h1>
    </AuthenticatedLayout>
  );
};

export default Index;
