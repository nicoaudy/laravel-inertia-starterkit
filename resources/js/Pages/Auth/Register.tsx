import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, TextInput } from '@mantine/core';
import GuestLayout from '@/Layouts/GuestLayout';

const Register = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData(name as keyof typeof data, value);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('register'));
  };

  return (
    <>
      <Head title='Register' />

      <form onSubmit={submit}>
        <div>
          <TextInput
            label='Name'
            type='text'
            name='name'
            value={data.name}
            autoComplete='name'
            autoFocus
            onChange={onHandleChange}
            error={errors.name}
          />
        </div>

        <div className='mt-4'>
          <TextInput
            label='Email'
            type='email'
            name='email'
            value={data.email}
            autoComplete='username'
            onChange={onHandleChange}
            error={errors.email}
          />
        </div>

        <div className='mt-4'>
          <TextInput
            label='Password'
            type='password'
            name='password'
            value={data.password}
            autoComplete='new-password'
            onChange={onHandleChange}
            error={errors.password}
          />
        </div>

        <div className='mt-4'>
          <TextInput
            label='Password Confirmation'
            type='password'
            name='password_confirmation'
            value={data.password_confirmation}
            onChange={onHandleChange}
            error={errors.password_confirmation}
          />
        </div>

        <div className='flex items-center justify-end mt-4'>
          <Link href={route('login')} className='underline text-sm text-gray-600 hover:text-gray-900'>
            Already registered?
          </Link>

          <Button type='submit' className='ml-4' loading={processing}>
            Register
          </Button>
        </div>
      </form>
    </>
  );
};

Register.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;

export default Register;
