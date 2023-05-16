import { Link } from '@inertiajs/react';
import { IconBrandLaravel } from '@tabler/icons';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className='min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100'>
      <div>
        <Link href='/'>
          <IconBrandLaravel size={40} color='gray' />
        </Link>
      </div>

      <div className='w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg'>
        {children}
      </div>
    </div>
  );
}
