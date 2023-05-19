import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import { TextInput, Button, Group, Text } from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import { IconSend } from '@tabler/icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';
import FileInput from '@/Components/FileInput';

const Edit = () => {
  const { user } = usePage().props;

  const { data, setData, errors, post, processing } = useForm({
    name: user.name || '',
    email: user.email || '',
    password: user.password || '',
    photo: '',

    // NOTE: When working with Laravel PUT/PATCH requests and FormData
    // you SHOULD send POST request and fake the PUT request like this.
    _method: 'PUT',
  });

  function handleSubmit(e) {
    e.preventDefault();

    // NOTE: We are using POST method here, not PUT/PACH. See comment above.
    post(route('management.users.update', user.id), {
      forceFormData: true,
    });
  }

  function destroy() {
    closeAllModals();
    router.delete(route('management.users.destroy', user.id));
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
      <Head title={data.name} />

      <div className='flex justify-between items-center border-b border-gray-300'>
        <h1 className='mt-2 mb-6 text-2xl font-semibold'>
          <Link href={route('management.users.index')} className='text-indigo-600 hover:text-indigo-700'>
            Users
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
              <div className='md:w-1/2 px-3 mb-6 md:mb-0'>
                <TextInput
                  label='Email'
                  type='email'
                  name='email'
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  error={errors.email}
                />
              </div>
            </div>
            <div className='-mx-3 md:flex mb-6'>
              <div className='md:w-1/2 px-3 mb-6 md:mb-0'>
                <TextInput
                  label='Password'
                  type='password'
                  name='password'
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  error={errors.password}
                />
              </div>
            </div>
            <div className='-mx-3 md:flex mb-6'>
              <div className='md:w-1/2 px-3 mb-6 md:mb-0'>
                <FileInput
                  className='w-full pb-8 pr-6 lg:w-1/2'
                  label='Photo'
                  name='photo'
                  accept='image/*'
                  errors={errors.photo}
                  value={data.photo}
                  onChange={(photo) => setData('photo', photo)}
                />
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center px-8 py-4 bg-gray-100 border-t border-gray-200'>
            <DeleteButton onDelete={openDeleteModal}>Delete User</DeleteButton>
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
