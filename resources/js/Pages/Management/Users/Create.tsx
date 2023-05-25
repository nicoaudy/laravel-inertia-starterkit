import { Head, Link, useForm } from '@inertiajs/react';
import { TextInput, Button, Image, Text, ActionIcon, HoverCard } from '@mantine/core';
import { IconSend, IconTrash } from '@tabler/icons-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    email: '',
    password: '',
    file: '' as File | '',
  });
  const [preview, setPreview] = useState<string>();

  function handleFileChange(event: FileWithPath[]) {
    if (event.length) {
      const inputFile = event[0];
      setData('file', inputFile as unknown as File);

      // Preview file
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('management.users.store'), {
      forceFormData: true,
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
      <Head title='Create User' />

      <div className='flex justify-between items-center border-b border-gray-300'>
        <h1 className='mt-2 mb-6 text-2xl font-semibold'>
          <Link href={route('management.users.index')} className='text-indigo-600 hover:text-indigo-700'>
            Users
          </Link>
          <span className='font-medium text-indigo-600'> /</span> Create
        </h1>
      </div>

      <div className='my-6 max-w-3xl overflow-hidden bg-white rounded shadow'>
        <form name='createForm' onSubmit={handleSubmit}>
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
          <div className='flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200'>
            <Button type='submit' leftIcon={<IconSend size={14} />} loading={processing}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

Create.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;
export default Create;
