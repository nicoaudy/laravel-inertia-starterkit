import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/layouts/guest-layout";
import React, { FormEventHandler } from "react";
import { CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VerifyEmailProps {
  status: string;
}

const VerifyEmail = ({ status }: VerifyEmailProps) => {
  const { post, processing } = useForm();

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("verification.send"));
  };

  return (
    <React.Fragment>
      <Head title='Email Verification' />

      <CardDescription>
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we
        just emailed to you? If you didn't receive the email, we will gladly send you another.
      </CardDescription>

      {status === "verification-link-sent" && (
        <div className='mb-4 font-medium text-sm text-green-600'>
          A new verification link has been sent to the email address you provided during registration.
        </div>
      )}

      <form onSubmit={submit}>
        <div className='mt-4 flex items-center justify-between'>
          <Button disabled={processing}>Resend Verification Email</Button>

          <Button variant='link' asChild>
            <Link href={route("logout")} method='post' as='button'>
              Log Out
            </Link>
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

VerifyEmail.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;

export default VerifyEmail;
