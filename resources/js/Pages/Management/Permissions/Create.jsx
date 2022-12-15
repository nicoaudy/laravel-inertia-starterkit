import { Head, Link, useForm } from '@inertiajs/react';
import { TextInput, Button } from '@mantine/core';
import { IconSend } from '@tabler/icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('management.permissions.store'));
  }

  return (
    <>
      <Head title="Create Permission" />

      <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="mt-2 mb-6 text-2xl font-semibold">
          <Link
            href={route('management.permissions.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Permissions
          </Link>
          <span className="font-medium text-indigo-600"> /</span> Create
        </h1>
      </div>

      <div className="my-6 max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-8 my-2 mb-4">
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  label="Name"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  error={errors.name}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <Button
              type="submit"
              leftIcon={<IconSend size={14} />}
              loading={processing}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

Create.layout = (page) => <AuthenticatedLayout children={page} />;
export default Create;
