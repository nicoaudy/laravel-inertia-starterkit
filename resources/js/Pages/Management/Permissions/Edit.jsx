import { router } from '@inertiajs/react';
import { Link, Head, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';
import LoadingButton from '@/Components/LoadingButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Checkbox from '@/Components/CustomCheckbox';

const Edit = () => {
  const { permission, users } = usePage().props;

  const { data, setData, errors, put, processing } = useForm({
    name: permission.name || '',
    users: permission.users || '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('management.permissions.update', permission.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this permission?')) {
      router.delete(route('management.permissions.destroy', permission.id));
    }
  }

  function selectAll() {
    if (data.users.length) {
      setData('users', []);
    } else {
      setData(
        'users',
        users.map((user) => user.id)
      );
    }
  }

  function onSelect(id) {
    if (data.users.includes(id)) {
      setData(
        'users',
        data.users.filter((row) => row != id)
      );
    } else {
      setData('users', [...data.users, id]);
    }
  }

  return (
    <AuthenticatedLayout>
      <Head title={permission.name} />

      <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="mt-2 mb-6 text-2xl font-semibold">
          <Link
            href={route('management.permissions.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Permissions
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
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <InputLabel for="user" value="Users" className="mb-4" />
                <label className="flex items-center">
                  <Checkbox
                    type="checkbox"
                    name="selectAll"
                    checked={data.users.length == users.length}
                    handleChange={selectAll}
                  />
                  <span className="ml-2 text-sm text-gray-600">Select All</span>
                </label>
                <div className="grid grid-cols-2 space-y-2">
                  {users.map(({ id, name }) => (
                    <label className="flex items-center" key={id}>
                      <Checkbox
                        type="checkbox"
                        name="users"
                        value={id}
                        handleChange={() => onSelect(id)}
                        checked={data.users.includes(id)}
                      />
                      <span className="ml-2 text-sm text-gray-600">{name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!permission.deleted_at && (
              <DeleteButton onDelete={destroy}>Delete Permission</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-primary"
            >
              Update Permission
            </LoadingButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
