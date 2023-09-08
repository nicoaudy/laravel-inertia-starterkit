import { PropsWithChildren } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className='min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0'>
      <Card className='w-full sm:max-w-md mt-6 pt-6'>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
