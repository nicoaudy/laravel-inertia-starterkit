import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TextInput, Checkbox, Button } from '@mantine/core';
import { IconSend } from '@tabler/icons';
import InputLabel from '@/Components/InputLabel';

const Create = () => {
  const { permissions } = usePage().props;

  const { data, setData, errors, post, processing } = useForm({
    name: '',
    permissions: [],
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('management.roles.store'));
  }

  function selectAll() {
    if (data.permissions.length) {
      setData('permissions', []);
    } else {
      setData(
        'permissions',
        permissions.map((permission) => permission.id)
      );
    }
  }

  function onSelect(id) {
    if (data.permissions.includes(id)) {
      setData(
        'permissions',
        data.permissions.filter((row) => row != id)
      );
    } else {
      setData('permissions', [...data.permissions, id]);
    }
  }

  return (
    <>
      <Head title="Create Role" />

      <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="mt-2 mb-6 text-2xl font-semibold">
          <Link
            href={route('management.roles.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Roles
          </Link>
          <span className="font-medium text-indigo-600"> /</span> Create
        </h1>
      </div>

      <div className="my-6 max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-8 my-2 mb-4">
            <div className="-mx-3 md:flex mb-6">
              <div className="w-1/2 px-3 mb-6 md:mb-0">
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

            <div className="-mx-3 md:flex mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <InputLabel for="permission" value="Permissions" className="mb-4" />
                <label className="flex items-center">
                  <Checkbox
                    label="Select All"
                    type="checkbox"
                    onChange={selectAll}
                  />
                </label>
                <div className="grid grid-cols-2 space-y-2">
                  {permissions.map(({ id, name }) => (
                    <Checkbox
                      key={id}
                      label={name}
                      name="permissions"
                      value={id}
                      onChange={() => onSelect(id)}
                      checked={data.permissions.includes(id)}
                    />
                  ))}
                </div>
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
