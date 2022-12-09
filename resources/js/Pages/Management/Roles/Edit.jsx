import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head, usePage, useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';
import LoadingButton from '@/Components/LoadingButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Checkbox from '@/Components/CustomCheckbox';

const Edit = () => {
  const { role, permissions, rolePermissions, users } = usePage().props;

  const { data, setData, errors, put, processing } = useForm({
    name: role.name || '',
    users: role.users || [],
    permissions: rolePermissions || [],
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('management.roles.update', role.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this role?')) {
      Inertia.delete(route('management.roles.destroy', role.id));
    }
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

  function selectAllUser() {
    if (data.users.length) {
      setData('users', []);
    } else {
      setData(
        'users',
        users.map((user) => user.id)
      );
    }
  }

  function onUserSelect(id) {
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
      <Head title={role.name} />

      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('management.roles.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Role
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {role.name}
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
            <div className="-mx-3 md:flex mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <InputLabel for="permission" value="Permissions" className="mb-4" />
                <label className="flex items-center">
                  <Checkbox
                    type="checkbox"
                    name="selectAll"
                    checked={data.permissions.length == permissions.length}
                    handleChange={selectAll}
                  />
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
            <div className="-mx-3 md:flex mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <InputLabel for="user" value="Users" className="mb-4" />
                <label className="flex items-center">
                  <Checkbox
                    type="checkbox"
                    name="selectAllUser"
                    checked={data.users.length == users.length}
                    handleChange={selectAllUser}
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
                        handleChange={() => onUserSelect(id)}
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
            {!role.deleted_at && (
              <DeleteButton onDelete={destroy}>Delete Role</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-primary"
            >
              Update Role
            </LoadingButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
