import React from "react";
import GuestLayout from "@/layouts/guest-layout";
import { Head, useForm } from "@inertiajs/react";
import { CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";

interface ForgotPasswordProps {
  status: string;
}

const ForgotPassword = ({ status }: ForgotPasswordProps) => {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("password.email"));
  };

  return (
    <React.Fragment>
      <Head title='Forgot Password' />

      <CardDescription className='mb-6'>
        Forgot your password? No problem. Just let us know your email address and we will email you a password reset
        link that will allow you to choose a new one.
      </CardDescription>

      {status && <div className='mb-4 font-medium text-sm text-green-600'>{status}</div>}

      <form onSubmit={submit}>
        <Input
          id='email'
          type='email'
          name='email'
          value={data.email}
          className='mt-1 block w-full'
          onChange={(e) => setData("email", e.target.value)}
          autoFocus
        />

        <InputError message={errors.email} className='mt-2' />

        <div className='flex items-center justify-end mt-4'>
          <Button className='ml-4' disabled={processing} loading={processing}>
            Email Password Reset Link
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

ForgotPassword.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;

export default ForgotPassword;
