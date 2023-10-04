import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import Breadcrumbs from "@/components/breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface Permission {
  id: number;
  name: string;
}

const items = [
  { title: "Home", href: route("dashboard") },
  { title: "Roles", href: route("management.roles.index") },
  { title: "Create", href: "#" },
];

const Create = () => {
  const props = usePage().props;
  const permissions = props.permissions as Permission[];

  const { data, setData, errors, post, processing } = useForm<{
    name: string;
    permissions: number[];
  }>({
    name: "",
    permissions: [],
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route("management.roles.store"));
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
        data.permissions.filter((row: number) => row !== id)
      );
    } else {
      setData("permissions", [...data.permissions, id]);
    }
  }

  return (
    <React.Fragment>
      <Head title='Create Role' />

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
              <Checkbox onCheckedChange={selectAll} />
              <Label>Select All</Label>
            </div>
            <div className='grid grid-cols-2 space-y-2'>
              {permissions.map(({ id, name }) => (
                <div className='flex items-center gap-2'>
                  <Checkbox
                    key={id}
                    name='permissions'
                    value={id}
                    onCheckedChange={() => onSelect(id)}
                    checked={data.permissions.includes(id)}
                  />
                  <Label>{name}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button type='submit' disabled={processing} loading={processing}>
            Submit
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

Create.layout = (page: React.ReactNode) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;
export default Create;
