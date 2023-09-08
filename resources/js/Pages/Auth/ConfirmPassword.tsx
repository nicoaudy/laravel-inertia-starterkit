import React, { FormEventHandler, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

const ConfirmPassword = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('password.confirm'));
  };

  return (
    <React.Fragment>
      <Head title='Confirm Password' />
      <div className='mb-4 text-sm text-gray-600'>
        This is a secure area of the application. Please confirm your password before continuing.
      </div>
      <form onSubmit={submit}>
        <div className='mt-4'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            name='password'
            value={data.password}
            className='mt-1 block w-full'
            onChange={(e) => setData('password', e.target.value)}
            autoFocus
          />
          <InputError message={errors.password} className='mt-2' />
        </div>
        <div className='flex items-center justify-end mt-4'>
          <Button type='submit' disabled={processing} loading={processing}>
            Confirm
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

ConfirmPassword.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;

export default ConfirmPassword;
