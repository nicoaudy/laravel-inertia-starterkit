import React from 'react';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import Icon from '@/Components/Icon';
import SearchFilter from '@/Components/SearchFilter';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = () => {
  const { users } = usePage().props;
  const {
    data,
    meta: { links },
  } = users;
  return (
    <AuthenticatedLayout>
      <Head title="Users" />

      <h1 className="mb-8 text-3xl font-bold">Users</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <Link
          className="btn-primary focus:outline-none"
          href={route('users.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> User</span>
        </Link>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Name</th>
              <th className="px-6 pt-5 pb-4">Email</th>
              <th className="px-6 pt-5 pb-4" colSpan="2">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, photo, email, owner }) => {
              return (
                <tr key={id} className="hover:bg-gray-100 focus-within:bg-gray-100">
                  <td className="border-t">
                    <Link
                      href={route('users.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                    >
                      {photo && (
                        <img
                          src={photo}
                          className="block w-5 h-5 mr-2 -my-2 rounded-full"
                        />
                      )}
                      {name}
                    </Link>
                  </td>
                  <td className="border-t">
                    <Link
                      tabIndex="-1"
                      href={route('users.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    >
                      {email}
                    </Link>
                  </td>
                  <td className="border-t">
                    <Link
                      tabIndex="-1"
                      href={route('users.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    >
                      {owner ? 'Owner' : 'User'}
                    </Link>
                  </td>
                  <td className="w-px border-t">
                    <Link
                      tabIndex="-1"
                      href={route('users.edit', id)}
                      className="flex items-center px-4 focus:outline-none"
                    >
                      <Icon
                        name="cheveron-right"
                        className="block w-6 h-6 text-gray-400 fill-current"
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination links={links} />
    </AuthenticatedLayout>
  );
};

export default Index;
