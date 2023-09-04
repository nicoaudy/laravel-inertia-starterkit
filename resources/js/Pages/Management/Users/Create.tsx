import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/breadcrumbs';
import FileDropzone from '@/Components/dropzone';
import { Label } from '@/Components/ui/label';
import { ImagePreview } from '@/Components/image-preview';
import { Input } from '@/Components/ui/input';
import InputError from '@/Components/input-error';
import { Button } from '@/Components/ui/button';

const items = [
  { title: 'Home', href: route('dashboard') },
  { title: 'Users', href: route('management.users.index') },
  { title: 'Create', href: '#' },
];

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    email: '',
    password: '',
    file: '' as File | '',
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('management.users.store'), {
      forceFormData: true,
    });
  }

  const handleFileDrop = (acceptedFiles: File[]) => {
    setData('file', acceptedFiles[0]);
  };

  return (
    <React.Fragment>
      <Head title='Create User' />

      <div className='space-y-6'>
        <Breadcrumbs items={items} />

        <form className='space-y-6' onSubmit={handleSubmit}>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input name='name' type='text' value={data.name} onChange={(e) => setData('name', e.target.value)} />
            <InputError message={errors.name} />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='email'>Email</Label>
            <Input name='email' type='email' value={data.email} onChange={(e) => setData('email', e.target.value)} />
            <InputError message={errors.email} />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='password'>Password</Label>
            <Input
              name='password'
              type='password'
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
            />
            <InputError message={errors.password} />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <FileDropzone onDrop={handleFileDrop} accept={{ 'image/jpeg': ['.jpeg', '.png'] }}>
              {!data.file && <Label>Drag & drop image files here (max size: 5MB, accepted formats: .jpg, .png)</Label>}
              {data.file && <ImagePreview files={[data.file]} />}
            </FileDropzone>
          </div>
          <Button type='submit' disabled={processing} loading={processing}>
            Submit
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

Create.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;
export default Create;
