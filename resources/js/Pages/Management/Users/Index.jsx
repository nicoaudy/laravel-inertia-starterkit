import { Head, Link, usePage } from '@inertiajs/react';
import Icon from '@/Components/Icon';
import TableWrapper from '@/Components/TableWrapper';
import TableHeader from '@/Components/TableHeader';
import TableHeaderRow from '@/Components/TableHeaderRow';
import TableDataRow from '@/Components/TableDataRow';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ResponsivePagination from '@/Components/ResponsivePagination';
import Filter from '@/Components/Filter';

const Index = () => {
  const { users } = usePage().props;
  const { data } = users;

  return (
    <>
      <Head title="Users" />

      <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="text-2xl font-semibold pt-2 pb-6">Users</h1>

        <Link
          className="btn-primary focus:outline-none"
          href={route('management.users.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> User</span>
        </Link>
      </div>

      <Filter />

      <TableWrapper>
        <TableHeader>
          <TableHeaderRow>
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-center" colSpan="2"></th>
          </TableHeaderRow>
        </TableHeader>
        <tbody className="text-gray-800 text-sm">
          {data.map(({ id, name, photo, email }, index) => {
            return (
              <TableDataRow key={index}>
                <td className="py-3 px-6 text-left">{users.from + index}</td>
                <td className="py-3 px-6 text-left">
                  <Link
                    href={route('management.users.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                  >
                    {photo && (
                      <img
                        src={`/${photo}`}
                        className="block w-5 h-5 mr-2 -my-2 rounded-full"
                      />
                    )}
                    {name}
                  </Link>
                </td>
                <td className="py-3 px-6 text-left">
                  <Link
                    tabIndex="-1"
                    href={route('management.users.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                  >
                    {email}
                  </Link>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <div className="transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                      <Link
                        tabIndex="-1"
                        href={route('management.users.edit', id)}
                        className="flex items-center px-4 focus:outline-none"
                      >
                        <Icon
                          name="cheveron-right"
                          className="block w-6 h-6 text-gray-400 fill-current"
                        />
                      </Link>
                    </div>
                  </div>
                </td>
              </TableDataRow>
            );
          })}
          {data.length === 0 && (
            <TableDataRow>
              <td className="px-6 py-4 border-t" colSpan="5">
                No users found.
              </td>
            </TableDataRow>
          )}
        </tbody>
      </TableWrapper>
      <ResponsivePagination source={users} />
    </>
  );
};

Index.layout = (page) => <AuthenticatedLayout children={page} />;
export default Index;
