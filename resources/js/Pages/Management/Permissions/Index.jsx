import { Head, Link, usePage } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Icon from '@/Components/Icon';
import TableWrapper from '@/Components/TableWrapper';
import TableHeader from '@/Components/TableHeader';
import TableHeaderRow from '@/Components/TableHeaderRow';
import TableDataRow from '@/Components/TableDataRow';
import ResponsivePagination from '@/Components/ResponsivePagination';
import Filter from '@/Components/Filter';

const Index = () => {
  const { permissions } = usePage().props;
  const { data } = permissions;

  return (
    <AuthenticatedLayout>
      <Head title="Permissions" />
      <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="text-2xl font-semibold pt-2 pb-6">Permissions</h1>
        <Link
          className="btn-primary focus:outline-none"
          href={route('management.permissions.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Permission</span>
        </Link>
      </div>
      <Filter />
      <TableWrapper>
        <TableHeader>
          <TableHeaderRow>
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Guard</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-center" colSpan="2"></th>
          </TableHeaderRow>
        </TableHeader>
        <tbody className="text-gray-800 text-sm">
          {data.map(({ id, name, guard_name }, index) => {
            return (
              <TableDataRow key={index}>
                <td className="py-3 px-6 text-left">{permissions.from + index}</td>
                <td className="py-3 px-6 text-left">{guard_name}</td>
                <td className="py-3 px-6 text-left">
                  <Link
                    href={route('management.permissions.edit', id)}
                    className="hover:text-indigo-600 hover:underline"
                  >
                    {name}
                  </Link>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <div className="transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                      <Link
                        tabIndex="-1"
                        href={route('management.permissions.edit', id)}
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
              <td className="px-6 py-4 border-t" colSpan="4">
                No permissions found.
              </td>
            </TableDataRow>
          )}
        </tbody>
      </TableWrapper>
      <ResponsivePagination source={permissions} />
    </AuthenticatedLayout>
  );
};

export default Index;
