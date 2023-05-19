import { Link, Head, usePage, useForm, router } from '@inertiajs/react';
import { TextInput, Checkbox, Button, Group, Text, Flex } from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import { IconSend } from '@tabler/icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';

const Edit = () => {
  const { permission, users } = usePage().props;

  const { data, setData, errors, put, processing } = useForm({
    name: permission.name || '',
    users: permission.users || [],
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('management.permissions.update', permission.id));
  }

  function destroy() {
    closeAllModals();
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

  const openDeleteModal = () => {
    return openModal({
      title: 'Please confirm your action',
      centered: true,
      children: (
        <>
          <Text size='sm'>Are you sure you want to delete this data? Once confirmed, you cannot redo this action.</Text>
          <Group className='mt-4' position='right'>
            <Button variant='outline' color='dark' onClick={closeAllModals}>
              Cancel
            </Button>
            <Button variant='outline' color='red' onClick={destroy}>
              Confirm
            </Button>
          </Group>
        </>
      ),
    });
  };

  return (
    <>
      <Head title={permission.name} />

      <div className='flex justify-between items-center border-b border-gray-300'>
        <h1 className='mt-2 mb-6 text-2xl font-semibold'>
          <Link href={route('management.permissions.index')} className='text-indigo-600 hover:text-indigo-700'>
            Permissions
          </Link>
          <span className='font-medium text-indigo-600'> / </span>
          {data.name}
        </h1>
      </div>

      <div className='my-6 max-w-3xl overflow-hidden bg-white rounded shadow'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col p-8 my-2 mb-4'>
            <div className='-mx-3 md:flex mb-6'>
              <div className='md:w-1/2 px-3 mb-6 md:mb-0'>
                <TextInput
                  label='Name'
                  type='text'
                  name='name'
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  error={errors.name}
                />
              </div>
            </div>
            <div className='-mx-3 md:flex mb-6'>
              <div className='w-full px-3 mb-6 md:mb-0'>
                <Flex justify='space-between' className='mb-4'>
                  <Text fz='sm'>Users</Text>
                  <Checkbox
                    label='Select All'
                    name='selectAll'
                    checked={data.users.length == users.length}
                    onChange={selectAll}
                  />
                </Flex>
                <div className='grid grid-cols-2 space-y-2'>
                  {users.map(({ id, name }) => (
                    <Checkbox
                      key={id}
                      label={name}
                      name='users'
                      value={id}
                      onChange={() => onSelect(id)}
                      checked={data.users.includes(id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center px-8 py-4 bg-gray-100 border-t border-gray-200'>
            <DeleteButton onDelete={openDeleteModal}>Delete Permission</DeleteButton>
            <Button type='submit' leftIcon={<IconSend size={14} />} loading={processing}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

Edit.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;
export default Edit;
