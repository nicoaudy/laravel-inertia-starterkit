import { Head, Link, usePage } from '@inertiajs/react';
import { ScrollArea, Table } from '@mantine/core';
import { Button } from '@mantine/core';
import { IconPlus, IconChevronRight } from '@tabler/icons-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Filter from '@/Components/Filter';
import ResponsivePagination from '@/Components/ResponsivePagination';
import { User } from '@/types';

interface Link {
  active: boolean;
  label: string;
  url: string;
}

interface PropsData {
  current_page: number;
  data: User[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

const Index = () => {
  const { users }: PropsData = usePage().props;

  const ths = (
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th colSpan={2}></th>
    </tr>
  );

  const rows = users.data.map(({ id, name, photo, email }, index: number) => (
    <tr key={index}>
      <td>{users.from + index}</td>
      <td>
        <Link href={route('management.users.edit', id)}>
          {photo && <img src={`/${photo}`} className='block w-5 h-5 mr-2 -my-2 rounded-full' />}
          {name}
        </Link>
      </td>
      <td>
        <Link
          tabIndex={-1}
          href={route('management.users.edit', id)}
          className='flex items-center px-6 py-4 focus:text-indigo focus:outline-none'>
          {email}
        </Link>
      </td>
      <td>
        <div className='flex item-center justify-center'>
          <div className='transform hover:text-purple-500 hover:scale-110 cursor-pointer'>
            <Link
              tabIndex={-1}
              href={route('management.users.edit', id)}
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
      <Head title='Users' />

      <div className='flex justify-between items-center border-b border-gray-300'>
        <h1 className='text-2xl font-semibold pt-2 pb-6'>Users</h1>
        <Link href={route('management.users.create')}>
          <Button color='dark' size='xs' leftIcon={<IconPlus size={14} />}>
            User
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
      <ResponsivePagination source={users} />
    </>
  );
};

Index.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;
export default Index;
