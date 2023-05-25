import { Head, Link, usePage } from '@inertiajs/react';
import { ScrollArea, Table } from '@mantine/core';
import { Button } from '@mantine/core';
import { IconChevronRight, IconPlus } from '@tabler/icons-react';
import Filter from '@/Components/Filter';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ResponsivePagination from '@/Components/ResponsivePagination';
import { IDefaultData } from '@/types/default-data';

interface Contact {
  address: string;
  city: string;
  country: string;
  created_at: string;
  deleted_at: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  postal_code: string;
  region: string;
  updated_at: string;
}

interface IProps extends IDefaultData {
  data: Contact[];
}

const Index = () => {
  const props = usePage().props;
  const contacts = props.contacts as IProps;

  const ths = (
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>City</th>
      <th>Phone</th>
      <th colSpan={2}></th>
    </tr>
  );

  const rows = contacts.data.map(({ id, name, city, phone }, index) => (
    <tr key={index}>
      <td>{contacts.from + index}</td>
      <td>{name}</td>
      <td>{name}</td>
      <td>{city}</td>
      <td>{phone}</td>
      <td>
        <div className='flex item-center justify-center'>
          <div className='transform hover:text-purple-500 hover:scale-110 cursor-pointer'>
            <Link tabIndex={-1} href={route('contacts.edit', id)} className='flex items-center px-4 focus:outline-none'>
              <IconChevronRight size={18} />
            </Link>
          </div>
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <Head title='Contacts' />
      <div className='flex justify-between items-center border-b border-gray-300'>
        <h1 className='text-2xl font-semibold pt-2 pb-6'>Contacts</h1>
        <Link href={route('contacts.create')}>
          <Button color='dark' size='xs' leftIcon={<IconPlus size={14} />}>
            Contact
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
      <ResponsivePagination source={contacts} />
    </>
  );
};

Index.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;

export default Index;
