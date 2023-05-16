import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import classNames from 'classnames';

interface SidebarLinkProps {
  icon: React.ReactNode;
  link: string;
  text: string;
  can?: boolean;
  active: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, link, text, can, active }) => {
  const navClass = classNames('flex items-center py-2.5 px-4 rounded hover:bg-gray-800 hover:text-white space-x-2', {
    'bg-gray-800 text-white': active,
  });

  if (!can) return null;

  return (
    <Link href={route(link)} className={navClass}>
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default SidebarLink;
