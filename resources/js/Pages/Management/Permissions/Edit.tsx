import { Head, usePage, useForm, router } from '@inertiajs/react';
import Breadcrumbs from '@/Components/breadcrumbs';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import InputError from '@/Components/input-error';
import { Button } from '@/Components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import { Checkbox } from '@/Components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { Can } from '@/Components/Can';

interface Permission {
  id: number;
  name: string;
  users: number[];
}

interface User {
  id: number;
  name: string;
  permissions: number[];
}

const items = [
  { title: 'Home', href: route('dashboard') },
  { title: 'Permissions', href: route('management.permissions.index') },
  { title: 'Edit', href: '#' },
];

const Edit = () => {
  const props = usePage().props;
  const permission = props.permission as Permission;
  const users = props.users as User[];

  const { data, setData, errors, put, processing } = useForm<{ name: string; users: number[] }>({
    name: permission.name || '',
    users: permission.users || [],
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('management.permissions.update', permission.id));
  }

  function destroy() {
    router.delete(route('management.permissions.destroy', permission.id));
  }

  function selectAll() {
    if (data.users.length) {
      setData('users', []);
    } else {
      setData(
        'users',
        users.map((user) => user.id)
      );
    }
  }

  function onSelect(id: number) {
    if (data.users.includes(id)) {
      setData(
        'users',
        data.users.filter((row) => row != id)
      );
    } else {
      setData('users', [...data.users, id]);
    }
  }

  return (
    <React.Fragment>
      <Head title={permission.name} />

      <div className='space-y-6'>
        <Breadcrumbs items={items} />

        <form className='space-y-6' onSubmit={handleSubmit}>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input name='name' type='text' value={data.name} onChange={(e) => setData('name', e.target.value)} />
            <InputError message={errors.name} />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <h1>Users</h1>
            <div className='flex items-center gap-2'>
              <Checkbox checked={data.users.length == users.length} onCheckedChange={selectAll} />
              <Label>Select All</Label>
            </div>
            <div className='grid grid-cols-2 space-y-2'>
              {users.map(({ id, name }) => (
                <div className='flex items-center gap-2'>
                  <Checkbox
                    key={id}
                    name='users'
                    value={id}
                    onCheckedChange={() => onSelect(id)}
                    checked={data.users.includes(id)}
                  />
                  <Label>{name}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className='w-full max-w-sm flex justify-between space-x-2'>
            <Can permission='delete permission'>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button type='button' variant='ghost'>
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your data and remove your data from our
                      servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={destroy}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Can>
            <Button type='submit' disabled={processing} loading={processing}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

Edit.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;
export default Edit;
