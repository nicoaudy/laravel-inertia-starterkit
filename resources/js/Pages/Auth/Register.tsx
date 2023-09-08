import React, { FormEventHandler, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

const Register = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',

    subdomain: '',
    business_name: '',
    business_address: '',
    business_phone: '',
    logo: '' as File | '',
  });

  console.log(data);

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('register'));
  };

  return (
    <React.Fragment>
      <Head title='Daftar' />

      <form onSubmit={submit}>
        <div>
          <Label htmlFor='name'>Name</Label>

          <Input
            id='name'
            name='name'
            value={data.name}
            className='mt-1 block w-full'
            autoComplete='name'
            onChange={(e) => setData('name', e.target.value)}
            autoFocus
          />

          <InputError message={errors.name} className='mt-2' />
        </div>

        <div className='mt-4'>
          <Label htmlFor='email'>Email</Label>

          <Input
            id='email'
            type='email'
            name='email'
            value={data.email}
            className='mt-1 block w-full'
            autoComplete='username'
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className='mt-2' />
        </div>

        <div className='mt-4'>
          <Label htmlFor='subdomain'>Subdomain</Label>

          <Input
            id='subdomain'
            type='subdomain'
            name='subdomain'
            value={data.subdomain}
            className='mt-1 block w-full'
            onChange={(e) => setData('subdomain', e.target.value)}
          />

          <InputError message={errors.subdomain} className='mt-2' />
        </div>

        <div className='mt-4'>
          <Label htmlFor='business_name'>Business Name</Label>

          <Input
            id='business_name'
            type='business_name'
            name='business_name'
            value={data.business_name}
            className='mt-1 block w-full'
            onChange={(e) => setData('business_name', e.target.value)}
          />

          <InputError message={errors.business_name} className='mt-2' />
        </div>

        <div className='mt-4'>
          <Label htmlFor='business_address'>Business Adress</Label>

          <Input
            id='business_address'
            type='business_address'
            name='business_address'
            value={data.business_address}
            className='mt-1 block w-full'
            onChange={(e) => setData('business_address', e.target.value)}
          />

          <InputError message={errors.business_address} className='mt-2' />
        </div>

        <div className='mt-4'>
          <Label htmlFor='business_phone'>Business Phone</Label>

          <Input
            id='business_phone'
            type='business_phone'
            name='business_phone'
            value={data.business_phone}
            className='mt-1 block w-full'
            onChange={(e) => setData('business_phone', e.target.value)}
          />

          <InputError message={errors.business_phone} className='mt-2' />
        </div>

        <div className='mt-4'>
          <Label htmlFor='logo'>Logo</Label>
          <Input
            id='logo'
            type='file'
            name='logo'
            className='mt-1 block w-full'
            onChange={(e) => setData('logo', e.target.value as unknown as File)}
            accept='image/png,image/jpeg'
          />

          <InputError message={errors.logo} className='mt-2' />
        </div>

        <div className='mt-4'>
          <Label htmlFor='password'>Password</Label>

          <Input
            id='password'
            type='password'
            name='password'
            value={data.password}
            className='mt-1 block w-full'
            autoComplete='new-password'
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className='mt-2' />
        </div>

        <div className='mt-4'>
          <Label htmlFor='password_confirmation'>Confirm Password</Label>

          <Input
            id='password_confirmation'
            type='password'
            name='password_confirmation'
            value={data.password_confirmation}
            className='mt-1 block w-full'
            autoComplete='new-password'
            onChange={(e) => setData('password_confirmation', e.target.value)}
          />

          <InputError message={errors.password_confirmation} className='mt-2' />
        </div>

        <div className='flex items-center justify-end mt-4'>
          <Button variant='link' asChild>
            <Link href={route('login')}>Already registered?</Link>
          </Button>

          <Button className='ml-4' disabled={processing} loading={processing}>
            Register
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

Register.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;

export default Register;
