import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LoadingButton from '@/Components/LoadingButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import FileInput from '@/Components/FileInput';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    email: '',
    password: '',
    photo: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('management.users.store'), {
      forceFormData: true,
    });
  }

  return (
    <AuthenticatedLayout>
      <Head title="Create User" />

      <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="mt-2 mb-6 text-2xl font-semibold">
          <Link
            href={route('management.users.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Users
          </Link>
          <span className="font-medium text-indigo-600"> /</span> Create
        </h1>
      </div>

      <div className="my-6 max-w-3xl overflow-hidden bg-white rounded shadow">
        <form name="createForm" onSubmit={handleSubmit}>
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
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-primary"
            >
              Create User
            </LoadingButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;
