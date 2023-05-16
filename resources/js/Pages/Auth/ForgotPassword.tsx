import GuestLayout from '@/Layouts/GuestLayout';
import { Button, TextInput } from '@mantine/core';
import { Head, useForm } from '@inertiajs/react';

const ForgotPassword = ({ status }) => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <>
      <Head title='Forgot Password' />

      <div className='mb-4 text-sm text-gray-500 leading-normal'>
        Forgot your password? No problem. Just let us know your email address and we will email you a password reset
        link that will allow you to choose a new one.
      </div>

      {status && <div className='mb-4 font-medium text-sm text-green-600'>{status}</div>}

      <form onSubmit={submit}>
        <TextInput
          label='Email'
          type='text'
          name='email'
          value={data.email}
          onChange={onHandleChange}
          autoFocus
          error={errors.email}
        />

        <div className='flex items-center justify-end mt-4'>
          <Button type='submit' className='ml-4' loading={processing}>
            Email Password Reset Link
          </Button>
        </div>
      </form>
    </>
  );
};

ForgotPassword.layout = (page) => <GuestLayout children={page} />;
export default ForgotPassword;
