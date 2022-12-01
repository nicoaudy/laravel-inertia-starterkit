import React from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import LoadingButton from '@/Components/LoadingButton';
import SelectInput from '@/Components/SelectInput';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('management.permissions.store'));
  }

  return (
    <AuthenticatedLayout>
      <Head title="Create Contact" />

      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('management.permissions.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Permission
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>

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
            </div>
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-primary"
            >
              Submit
            </LoadingButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;