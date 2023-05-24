import { Head, Link, usePage } from '@inertiajs/react';
import { ScrollArea, Table } from '@mantine/core';
import { Button } from '@mantine/core';
import { IconChevronRight, IconPlus } from '@tabler/icons-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Filter from '@/Components/Filter';
import ResponsivePagination from '@/Components/ResponsivePagination';

const Index = () => {
  const { roles } = usePage().props;
  const { data } = roles;

  const ths = (
    <tr>
      <th>#</th>
      <th>Guard</th>
      <th>Name</th>
      <th></th>
    </tr>
  );

  const rows = data.map(({ id, guard_name, name }, index) => (
    <tr key={index}>
      <td className='py-3 px-6 text-left'>{roles.from + index}</td>
      <td className='py-3 px-6 text-left'>{guard_name}</td>
      <td className='py-3 px-6 text-left'>{name}</td>
      <td className='py-3 px-6 text-center'>
        <div className='flex item-center justify-center'>
          <div className='transform hover:text-purple-500 hover:scale-110 cursor-pointer'>
            <Link
              tabIndex={-1}
              href={route('management.roles.edit', id)}
              className='flex items-center px-4 focus:outline-none'>
              <IconChevronRight size={18} />
            </Link>
          </div>
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <Head title='Roles' />
      <div className='flex justify-between items-center border-b border-gray-300'>
        <h1 className='text-2xl font-semibold pt-2 pb-6'>Roles</h1>
        <Link href={route('management.roles.create')}>
          <Button color='dark' size='xs' leftIcon={<IconPlus size={14} />}>
            Role
          </Button>
        </Link>
      </div>

      <Filter />
      <ScrollArea>
        <Table highlightOnHover>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <ResponsivePagination source={roles} />
    </>
  );
};

Index.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;
export default Index;
