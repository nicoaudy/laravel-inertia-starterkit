import { Link } from '@inertiajs/react';
import React from 'react';

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <ul className='flex items-center'>
      {items.map((item, index) => (
        <li key={index}>
          {index === items.length - 1 ? (
            <span className='text-sm text-primary underline-offset-4 opacity-50'>{item.title}</span>
          ) : (
            <Link href={item.href} className='text-sm text-primary underline-offset-4 hover:underline'>
              {item.title}
            </Link>
          )}
          {index < items.length - 1 && <span className='text-sm mx-1 text-gray-200'>/</span>}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
