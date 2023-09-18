import * as React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

type Props = {
  navigation: {
    title: string;
    href: string;
    active: boolean;
    count?: number;
  }[];
  className?: string;
};

export const PageTabs: React.FC<React.PropsWithChildren<Props>> = ({ navigation, className }) => {
  return (
    <nav className={cn('sticky top-0 bg-background z-20', className)}>
      <div className='flex items-center w-full gap-4 overflow-x-auto'>
        {navigation.map(({ title, href, active, count }, index) => {
          return (
            <li
              className={cn('list-none border-b-2 border-transparent p-2 whitespace-nowrap', {
                'border-primary': active,
              })}
              key={index}>
              <Link
                href={href}
                className={cn(
                  'text-sm font-medium py-2 px-3 -mx-3 text-content-subtle hover:bg-background-subtle rounded-md hover:text-primary',
                  {
                    'text-primary': active,
                  }
                )}>
                {title}
                {count != undefined && (
                  <Badge className='ml-2' variant='outline'>
                    {count}
                  </Badge>
                )}
              </Link>
            </li>
          );
        })}
      </div>
      <Separator />
    </nav>
  );
};
