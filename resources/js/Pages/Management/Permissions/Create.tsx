import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import Breadcrumbs from "@/components/breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import React from "react";

const items = [
  { title: "Home", href: route("dashboard") },
  { title: "Permissions", href: route("management.permissions.index") },
  { title: "Create", href: "#" },
];

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route("management.permissions.store"));
  }

  return (
    <React.Fragment>
      <Head title='Create Permission' />

      <div className='space-y-6'>
        <Breadcrumbs items={items} />

        <form className='space-y-6' onSubmit={handleSubmit}>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input name='name' type='text' value={data.name} onChange={(e) => setData("name", e.target.value)} />
            <InputError message={errors.name} />
          </div>

          <Button type='submit' disabled={processing} loading={processing}>
            Submit
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

Create.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;
export default Create;
