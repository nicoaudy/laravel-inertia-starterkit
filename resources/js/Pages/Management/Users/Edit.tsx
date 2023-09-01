import React from 'react';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/breadcrumbs';
import FileDropzone from '@/Components/dropzone';
import { Label } from '@/Components/ui/label';
import { ImagePreview } from '@/Components/image-preview';
import { Input } from '@/Components/ui/input';
import InputError from '@/Components/input-error';
import { Button } from '@/Components/ui/button';
import { User } from '@/types/interfaces';
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

const items = [
  { title: 'Home', href: route('dashboard') },
  { title: 'Users', href: route('management.users.index') },
  { title: 'Edit', href: '#' },
];

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
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    post(route('management.users.update', user.id), {
      forceFormData: true,
    });
  }

  function destroy() {
    router.delete(route('management.users.destroy', user.id));
  }

  const handleFileDrop = (acceptedFiles: File[]) => {
    setData('file', acceptedFiles[0]);
  };

  return (
    <React.Fragment>
      <Head title={data.name} />

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
          <div className='w-full max-w-sm flex justify-between space-x-2'>
            <Can permission='delete user'>
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
