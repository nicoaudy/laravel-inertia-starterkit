import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import { TextInput, Button, Group, Text, HoverCard, Image, ActionIcon } from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import { IconSend, IconTrash } from '@tabler/icons-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';
import { User } from '@/types/user';
import { useState } from 'react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

const Edit = () => {
  const props = usePage().props;
  const user = props.user as User;

  const { data, setData, errors, post, processing } = useForm({
    name: user.name || '',
    email: user.email || '',
    password: '',
    file: '' as File | '',
    _method: 'PUT',
  });
  const [preview, setPreview] = useState<string>(user.photo ? `/${user.photo}` : '');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    post(route('management.users.update', user.id), {
      forceFormData: true,
    });
  }

  function handleFileChange(event: FileWithPath[]) {
    if (event.length) {
      const inputFile = event[0];
      setData('file', inputFile as unknown as File);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(inputFile);
    }
  }

  function handleDelete() {
    setData('file', '');
    setPreview('');
  }

  function destroy() {
    closeAllModals();
    router.delete(route('management.users.destroy', user.id));
  }

  function openDeleteModal() {
    return openModal({
      title: 'Please confirm your action',
      centered: true,
      children: (
        <>
          <Text size='sm'>Are you sure you want to delete this data? Once confirmed, you cannot redo this action.</Text>
          <Group className='mt-4' position='right'>
            <Button variant='outline' color='dark' onClick={() => closeAllModals}>
              Cancel
            </Button>
            <Button variant='outline' color='red' onClick={destroy}>
              Confirm
            </Button>
          </Group>
        </>
      ),
    });
  }

  function PreviewImage({ file }: { file: string }) {
    return (
      <HoverCard shadow='md'>
        <HoverCard.Target>
          <Image src={file} alt='Upload Preview' />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <ActionIcon variant='outline' color='red' onClick={handleDelete}>
            <IconTrash />
          </ActionIcon>
        </HoverCard.Dropdown>
      </HoverCard>
    );
  }

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
                <Dropzone accept={IMAGE_MIME_TYPE} onDrop={handleFileChange}>
                  <Text align='center'>Drop images here</Text>
                </Dropzone>
                {preview && (
                  <div className='mt-4'>
                    <PreviewImage file={preview} />
                  </div>
                )}
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
