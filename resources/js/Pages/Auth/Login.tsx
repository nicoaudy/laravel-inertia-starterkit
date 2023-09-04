import React, { FormEventHandler, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Switch } from '@/Components/ui/switch';
import { Button } from '@/Components/ui/button';
import InputError from '@/Components/input-error';

interface LoginProps {
  status: string;
}

export function Login({ status }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <React.Fragment>
      <Head title='Masuk' />

      {status && <div className='mb-4 font-medium text-sm text-green-600'>{status}</div>}

      <form onSubmit={submit}>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            name='email'
            value={data.email}
            className='mt-1 block w-full'
            autoComplete='username'
            onChange={(e) => setData('email', e.target.value)}
            autoFocus
          />
          <InputError message={errors.email} className='mt-2' />
        </div>
        <div className='mt-4'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            name='password'
            value={data.password}
            className='mt-1 block w-full'
            autoComplete='current-password'
            onChange={(e) => setData('password', e.target.value)}
          />
          <InputError message={errors.password} className='mt-2' />
        </div>
        <div className='block mt-4'>
          <Label className='flex items-center'>
            <Switch name='remember' checked={data.remember} onCheckedChange={(value) => setData('remember', value)} />
            <span className='ml-2 text-sm text-gray-600'>Remember me</span>
          </Label>
        </div>
        <div className='flex items-center justify-end mt-4'>
          <Button variant='link' asChild>
            <Link href={route('password.request')}>Forgot your password?</Link>
          </Button>
          <Button className='ml-4' disabled={processing} loading={processing}>
            Log in
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}

Login.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;

export default Login;
