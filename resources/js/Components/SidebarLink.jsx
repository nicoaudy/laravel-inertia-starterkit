import { Link } from '@inertiajs/react';
import classNames from 'classnames';

const SidebarLink = ({ icon, link, text, can }) => {
  const isActive = route().current(link + '*');

  const navClass = classNames(
    'flex items-center py-2.5 px-4 rounded hover:bg-gray-800 hover:text-white space-x-2',
    {
      'bg-gray-800 text-white': isActive,
    }
  );

  if (!can) return;

  return (
    <Link href={route(link)} className={navClass}>
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default SidebarLink;
