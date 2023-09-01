import React from 'react';
import { Sidebar } from '@/Components/sidebar';
import { Navbar } from '@/Components/navbar';
import { House, UsersFour } from '@phosphor-icons/react';
import FlashMessages from '@/Components/flash-messages';
import { FaceIcon, RocketIcon } from '@radix-ui/react-icons';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const menu = [
    {
      name: 'Menu Utama',
      links: [
        {
          icon: <House className='mr-2 h-4 w-4' />,
          label: 'Home',
          href: route('dashboard'),
          active: route().current('dashboard'),
        },
      ],
    },
    {
      name: 'Management',
      links: [
        {
          icon: <FaceIcon className='mr-2 h-4 w-4' />,
          label: 'Users',
          href: route('management.users.index'),
          active: route().current('management.users.*'),
          can: 'view user',
        },
        {
          icon: <RocketIcon className='mr-2 h-4 w-4' />,
          label: 'Roles',
          href: route('management.roles.index'),
          active: route().current('management.roles.*'),
          can: 'view role',
        },
        {
          icon: <RocketIcon className='mr-2 h-4 w-4' />,
          label: 'Permissions',
          href: route('management.permissions.index'),
          active: route().current('management.permissions.*'),
          can: 'view permission',
        },
      ],
    },
    {
      name: 'Master Data',
      permissions: ['view patient', 'view pricelist', 'view stock', 'view team'],
      links: [
        {
          icon: <UsersFour className='mr-2 h-4 w-4' />,
          label: 'Contacts',
          href: route('contacts.index'),
          active: route().current('contacts.*'),
          can: 'view contact',
        },
      ],
    },
  ];

  return (
    <div className='flex-col md:flex h-screen'>
      <Navbar menu={menu} />
      <div className='flex-1 overflow-hidden bg-background'>
        <div className='flex'>
          <Sidebar className='w-1/4 lg:block hidden overflow-y-auto h-screen pt-20' menu={menu} />
          <div className='flex-3 overflow-y-auto lg:border-l h-screen container pt-20 pb-10'>{children}</div>
        </div>
      </div>

      <FlashMessages />
    </div>
  );
};

export default AuthenticatedLayout;
