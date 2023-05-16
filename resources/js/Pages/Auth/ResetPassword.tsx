import { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button, TextInput } from '@mantine/core';
import GuestLayout from '@/Layouts/GuestLayout';

const ResetPassword = ({ token, email }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('password.update'));
  };

  return (
    <>
      <Head title='Reset Password' />

      <form onSubmit={submit}>
        <div>
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
            autoFocus
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
            autoComplete='new-password'
            onChange={onHandleChange}
            error={errors.password_confirmation}
          />
        </div>

        <div className='flex items-center justify-end mt-4'>
          <Button type='submit' className='ml-4' loading={processing}>
            Reset Password
          </Button>
        </div>
      </form>
    </>
  );
};

ResetPassword.layout = (page) => <GuestLayout children={page} />;
export default ResetPassword;
