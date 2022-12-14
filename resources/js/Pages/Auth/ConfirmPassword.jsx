import { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { TextInput } from '@mantine/core';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';

const ConfirmPassword = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('password.confirm'));
  };

  return (
    <>
      <Head title="Confirm Password" />

      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password before
        continuing.
      </div>

      <form onSubmit={submit}>
        <div className="mt-4">
          <TextInput
            label="Password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoFocus
            onChange={onHandleChange}
            error={errors.password}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4" processing={processing}>
            Confirm
          </PrimaryButton>
        </div>
      </form>
    </>
  );
};

ConfirmPassword.layout = (page) => <GuestLayout children={page} />;
export default ConfirmPassword;
