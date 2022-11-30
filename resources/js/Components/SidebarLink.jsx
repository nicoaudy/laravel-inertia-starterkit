import { Link } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import Icon from '@/Components/Icon';

const SidebarLink = ({ icon, link, text }) => {
  const isActive = route().current(link + '*');

  const navClass = classNames(
    'flex items-center py-2.5 px-4 rounded hover:bg-gray-800 hover:text-white space-x-2',
    {
      'bg-gray-800 text-white': isActive,
    }
  );

  const iconClasses = classNames('w-4 h-4', {
    'text-white fill-current': isActive,
    'fill-current': !isActive,
  });

  return (
    <Link href={route(link)} className={navClass}>
      <Icon name={icon} className={iconClasses} />
      <span>{text}</span>
    </Link>
  );
};

export default SidebarLink;
