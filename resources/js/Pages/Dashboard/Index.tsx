import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/authenticated-layout";

const Dashboard = () => {
  return (
    <>
      <Head title='Dashboard' />

      <div className='flex justify-between items-center border-b border-gray-300'>
        <h1 className='text-2xl font-semibold pt-2 pb-6'>Dashboard</h1>
      </div>

      <p className='mt-4 mb-12 leading-normal'>Hey there! Welcome to Laravel Inertia Starterkit help illustrate how.</p>
    </>
  );
};

Dashboard.layout = (page: React.ReactNode) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;

export default Dashboard;
