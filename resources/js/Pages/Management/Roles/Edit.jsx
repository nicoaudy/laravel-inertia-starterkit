import { router } from '@inertiajs/react';
import { Link, Head, usePage, useForm } from '@inertiajs/react';
import { TextInput, Checkbox, Button, Group, Text } from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

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
    closeAllModals();
    router.delete(route('management.roles.destroy', role.id));
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

  const openDeleteModal = () => {
    return openModal({
      title: 'Please confirm your action',
      centered: true,
      children: (
        <>
          <Text size="sm">
            Are you sure you want to delete this data? Once confirmed, you cannot
            redo this action.
          </Text>
          <Group className="mt-4" position="right">
            <Button variant="outline" color="dark" onClick={closeAllModals}>
              Cancel
            </Button>
            <Button variant="outline" color="red" onClick={destroy}>
              Confirm
            </Button>
          </Group>
        </>
      ),
    });
  };

  return (
    <>
      <Head title={role.name} />

      <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="mt-2 mb-6 text-2xl font-semibold">
          <Link
            href={route('management.roles.index')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Roles
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
                <TextInput
                  label="Name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="w-full"
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
                    name="selectAll"
                    checked={data.permissions.length == permissions.length}
                    onChange={selectAll}
                  />
                </label>
                <div className="grid grid-cols-2 space-y-2">
                  {permissions.map(({ id, name }) => (
                    <Checkbox
                      key={id}
                      label={name}
                      type="checkbox"
                      name="permissions"
                      value={id}
                      onChange={() => onSelect(id)}
                      checked={data.permissions.includes(id)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <InputLabel for="user" value="Users" className="mb-4" />
                <label className="flex items-center">
                  <Checkbox
                    label="Select All"
                    name="selectAllUser"
                    checked={data.users.length == users.length}
                    onChange={selectAllUser}
                  />
                </label>
                <div className="grid grid-cols-2 space-y-2">
                  {users.map(({ id, name }) => (
                    <Checkbox
                      key={id}
                      label={name}
                      type="checkbox"
                      name="users"
                      value={id}
                      onChange={() => onUserSelect(id)}
                      checked={data.users.includes(id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            <DeleteButton onDelete={openDeleteModal}>Delete Role</DeleteButton>
            <PrimaryButton processing={processing} type="submit" className="ml-auto">
              Update Role
            </PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
};

Edit.layout = (page) => <AuthenticatedLayout children={page} />;
export default Edit;
