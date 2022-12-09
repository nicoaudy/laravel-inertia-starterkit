import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/CustomCheckbox';
import LoadingButton from '@/Components/LoadingButton';

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
    <AuthenticatedLayout>
      <Head title="Create Contact" />

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

            <div className="-mx-3 md:flex mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <InputLabel for="permission" value="Permissions" className="mb-4" />
                <label className="flex items-center">
                  <Checkbox type="checkbox" handleChange={selectAll} />
                  <span className="ml-2 text-sm text-gray-600">Select All</span>
                </label>
                <div className="grid grid-cols-2 space-y-2">
                  {permissions.map(({ id, name }) => (
                    <label className="flex items-center" key={id}>
                      <Checkbox
                        type="checkbox"
                        name="permissions"
                        value={id}
                        handleChange={() => onSelect(id)}
                        checked={data.permissions.includes(id)}
                      />
                      <span className="ml-2 text-sm text-gray-600">{name}</span>
                    </label>
                  ))}
                </div>
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
