import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage, useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';
import LoadingButton from '@/Components/LoadingButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import FileInput from '@/Components/FileInput';
import TrashedMessage from '@/Components/TrashedMessage';

const Edit = () => {
  const pageProps = usePage().props;
  const user = pageProps.user.data;

  const { data, setData, errors, post, processing } = useForm({
    name: user.name || '',
    email: user.email || '',
    password: user.password || '',
    owner: user.owner ? '1' : '0' || '0',
    photo: '',

    // NOTE: When working with Laravel PUT/PATCH requests and FormData
    // you SHOULD send POST request and fake the PUT request like this.
    _method: 'PUT',
  });

  function handleSubmit(e) {
    e.preventDefault();

    // NOTE: We are using POST method here, not PUT/PACH. See comment above.
    post(route('users.update', user.id), {
      forceFormData: true,
    });
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this user?')) {
      Inertia.delete(route('users.destroy', user.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this user?')) {
      Inertia.put(route('users.restore', user.id));
    }
  }

  return (
    <AuthenticatedLayout>
      <Head title={data.name} />
      <div className="flex justify-start max-w-lg mb-8">
        <h1 className="text-3xl font-bold">
          <Link
            href={route('users.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Users
          </Link>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {data.name}
        </h1>
        {user.photo && (
          <img className="block w-8 h-8 ml-4 rounded-full" src={`/${user.photo}`} />
        )}
      </div>
      {user.deleted_at && (
        <TrashedMessage onRestore={restore}>
          This user has been deleted.
        </TrashedMessage>
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-8 my-2 mb-4">
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel forInput="name" value="Name" />
                <TextInput
                  type="text"
                  name="name"
                  value={data.name}
                  className="w-full"
                  handleChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel forInput="email" value="Email" />
                <TextInput
                  type="email"
                  name="email"
                  value={data.email}
                  className="w-full"
                  handleChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel forInput="password" value="Password" />
                <TextInput
                  type="password"
                  name="password"
                  value={data.password}
                  className="w-full"
                  handleChange={(e) => setData('password', e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
              </div>
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel forInput="owner" value="Owner" />
                <SelectInput
                  name="owner"
                  errors={errors.owner}
                  value={data.owner}
                  className="w-full"
                  onChange={(e) => setData('owner', e.target.value)}
                >
                  <option value=""></option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </SelectInput>
                <InputError message={errors.owner} className="mt-2" />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <FileInput
                  className="w-full pb-8 pr-6 lg:w-1/2"
                  label="Photo"
                  name="photo"
                  accept="image/*"
                  errors={errors.photo}
                  value={data.photo}
                  onChange={(photo) => setData('photo', photo)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!user.deleted_at && (
              <DeleteButton onDelete={destroy}>Delete User</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update User
            </LoadingButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
