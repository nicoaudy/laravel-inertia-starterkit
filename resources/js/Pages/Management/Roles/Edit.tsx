import { Head, usePage, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import Breadcrumbs from "@/components/breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Can } from "@/components/Can";

interface Role {
  id: number;
  name: string;
  users: [];
}

interface Permission {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  roles: number[];
}

const items = [
  { title: "Home", href: route("dashboard") },
  { title: "Roles", href: route("management.roles.index") },
  { title: "Edit", href: "#" },
];

const Edit = () => {
  const props = usePage().props;
  const role = props.role as Role;
  const permissions = props.permissions as Permission[];
  const rolePermissions = props.rolePermissions as number[];
  const users = props.users as User[];

  const { data, setData, errors, put, processing } = useForm<{ name: string; users: number[]; permissions: number[] }>({
    name: role.name || "",
    users: role.users || [],
    permissions: rolePermissions || [],
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route("management.roles.update", role.id));
  }

  function destroy() {
    router.delete(route("management.roles.destroy", role.id));
  }

  function selectAll() {
    if (data.permissions.length) {
      setData("permissions", []);
    } else {
      setData(
        "permissions",
        permissions.map((permission) => permission.id)
      );
    }
  }

  function onSelect(id: number) {
    if (data.permissions.includes(id)) {
      setData(
        "permissions",
        data.permissions.filter((row) => row !== id)
      );
    } else {
      setData("permissions", [...data.permissions, id]);
    }
  }

  function selectAllUser() {
    if (data.users.length) {
      setData("users", []);
    } else {
      setData(
        "users",
        users.map((user) => user.id)
      );
    }
  }

  function onUserSelect(id: number) {
    if (data.users.includes(id)) {
      setData(
        "users",
        data.users.filter((row) => row !== id)
      );
    } else {
      setData("users", [...data.users, id]);
    }
  }

  return (
    <React.Fragment>
      <Head title={role.name} />

      <div className='space-y-6'>
        <Breadcrumbs items={items} />

        <form className='space-y-6' onSubmit={handleSubmit}>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input name='name' type='text' value={data.name} onChange={(e) => setData("name", e.target.value)} />
            <InputError message={errors.name} />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <h1>Permissions</h1>
            <div className='flex items-center gap-2'>
              <Checkbox onCheckedChange={selectAll} checked={data.permissions.length == permissions.length} />
              <Label>Select All</Label>
            </div>
            <div className='grid grid-cols-2 space-y-2'>
              {permissions.map(({ id, name }) => (
                <div className='flex items-center gap-2' key={`${id}-${name}`}>
                  <Checkbox
                    name='permission'
                    value={id}
                    onCheckedChange={() => onSelect(id)}
                    checked={data.permissions.includes(id)}
                  />
                  <Label>{name}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <h1>Users</h1>
            <div className='flex items-center gap-2'>
              <Checkbox checked={data.users.length == users.length} onCheckedChange={selectAllUser} />
              <Label>Select All</Label>
            </div>
            <div className='grid grid-cols-2 space-y-2'>
              {users.map(({ id, name }) => (
                <div className='flex items-center gap-2' key={`${id}-${name}`}>
                  <Checkbox
                    name='users'
                    value={id}
                    onCheckedChange={() => onUserSelect(id)}
                    checked={data.users.includes(id)}
                  />
                  <Label>{name}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className='w-full max-w-sm flex justify-between space-x-2'>
            <Can permission='delete role'>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button type='button' variant='ghost'>
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your data and remove your data from our
                      servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={destroy}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Can>
            <Button type='submit' disabled={processing} loading={processing}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

Edit.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;
export default Edit;
