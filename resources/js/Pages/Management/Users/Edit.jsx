import { router } from '@inertiajs/react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';
import LoadingButton from '@/Components/LoadingButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
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
    if (confirm('Are you sure you want to delete this user?')) {
      router.delete(route('management.users.destroy', user.id));
    }
  }

  return (
    <AuthenticatedLayout>
      <Head title={data.name} />

      <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="mt-2 mb-6 text-2xl font-semibold">
          <Link
            href={route('management.users.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Users
          </Link>
          <span className="font-medium text-indigo-600"> / </span>
          {data.name}
        </h1>
      </div>

      <div className="my-6 max-w-3xl overflow-hidden bg-white rounded shadow">
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
              className="ml-auto btn-primary"
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
