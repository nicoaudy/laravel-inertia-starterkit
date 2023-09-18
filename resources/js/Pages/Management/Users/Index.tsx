import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import Filter from '@/components/filter';
import { IDefaultData, User } from '@/types/interfaces';
import ResponsivePagination from '@/components/responsive-pagination';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Can } from '@/components/Can';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { TableCellSort } from '@/components/table-cell-sort';
import useFilterPagination from '@/hooks/useFilterPagination';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import React from 'react';
import { PageTabs } from '@/components/page-tabs';

interface PropsData extends IDefaultData {
  data: User[];
}

const Index = () => {
  const props = usePage().props;
  const users = props.users as PropsData;

  const [form, setForm] = useFilterPagination();

  const handleSort = (s: string) => {
    const newSortDir = form.sortBy === s && form.sortDir === 'asc' ? 'desc' : 'asc';
    setForm((prevForm) => ({
      ...prevForm,
      sortBy: s,
      sortDir: newSortDir,
    }));
  };

  const ths = (
    <TableRow>
      <TableHead>No.</TableHead>
      <TableHead>
        <TableCellSort
          title='Name'
          sortBy='name'
          currentSortBy={form.sortBy}
          sortDir={form.sortDir}
          onSort={handleSort}
        />
      </TableHead>
      <TableHead>
        <TableCellSort
          title='Email'
          sortBy='email'
          currentSortBy={form.sortBy}
          sortDir={form.sortDir}
          onSort={handleSort}
        />
      </TableHead>
      <TableHead>Role</TableHead>
      <TableHead>
        <TableCellSort
          title='Created At'
          sortBy='created_at'
          currentSortBy={form.sortBy}
          sortDir={form.sortDir}
          onSort={handleSort}
        />
      </TableHead>
      <TableHead></TableHead>
    </TableRow>
  );

  const rows = users.data.map(({ id, name, photo, email, created_at }, index: number) => (
    <TableRow key={index}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        {photo && (
          <Avatar className='mr-2'>
            <AvatarImage src={`/${photo}`} />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
        )}
        {name}
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{created_at}</TableCell>
      <TableCell>
        <Can permission='edit user'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost'>
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={route('management.users.edit', id)}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </Can>
      </TableCell>
    </TableRow>
  ));

  const navigation = [
    {
      title: 'Users',
      href: route('management.users.index'),
      active: route().current('management.users.*'),
    },
    {
      title: 'Roles',
      href: route('management.roles.index'),
      active: route().current('management.roles.*'),
    },
    {
      title: 'Permissions',
      href: route('management.permissions.index'),
      active: route().current('management.permissions.*'),
    },
  ];

  return (
    <React.Fragment>
      <Head title='Users' />

      <PageTabs navigation={navigation} className='mb-20' />

      <div className='flex justify-between items-center mb-8'>
        <Filter />

        <Can permission='add user'>
          <Link href={route('management.users.create')}>
            <Button>Add new user</Button>
          </Link>
        </Can>
      </div>

      {rows.length === 0 && <EmptyPlaceholder title='Data not found.' className='mt-4' />}
      {rows.length !== 0 && (
        <Table>
          <TableHeader>{ths}</TableHeader>
          <TableBody>{rows}</TableBody>
        </Table>
      )}

      <ResponsivePagination source={users} />
    </React.Fragment>
  );
};

Index.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;
export default Index;
