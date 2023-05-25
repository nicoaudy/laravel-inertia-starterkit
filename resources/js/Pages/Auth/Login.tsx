import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { TextInput, Checkbox, Button } from '@mantine/core';
import GuestLayout from '@/Layouts/GuestLayout';

interface LoginProps {
  status: string;
  canResetPassword: boolean;
}

const Login = ({ status, canResetPassword }: LoginProps) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: 'johndoe@example.com',
    password: 'password',
    remember: true,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setData(name as keyof typeof data, type === 'checkbox' ? checked : value);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <>
      <Head title='Log in' />

      {status && <div className='mb-4 font-medium text-sm text-green-600'>{status}</div>}

      <form onSubmit={submit}>
        <div>
          <TextInput
            label='Email'
            type='text'
            name='email'
            value={data.email}
            autoComplete='username'
            autoFocus
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
            autoComplete='current-password'
            onChange={onHandleChange}
            error={errors.password}
          />
        </div>

        <div className='block mt-4'>
          <Checkbox name='remember' checked={data.remember} onChange={onHandleChange} label='Remember me' />
        </div>

        <div className='flex items-center justify-end mt-4'>
          {canResetPassword && (
            <Link href={route('password.request')} className='underline text-sm text-gray-600 hover:text-gray-900'>
              Forgot your password?
            </Link>
          )}

          <Button type='submit' className='ml-4' loading={processing}>
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

Login.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;

export default Login;
