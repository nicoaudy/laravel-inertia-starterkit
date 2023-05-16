import { Link } from '@inertiajs/react';
import classNames from 'classnames';

interface Props {
  link: string;
  text: string;
}

const SidebarDropdownLink: React.FC<Props> = ({ link, text }) => {
  const isActive = route().current(link + '*');

  const navClass = classNames('block py-2 px-4 hover:bg-gray-800 hover:text-white rounded', {
    'bg-gray-800 text-white': isActive,
  });

  return (
    <Link href={route(link)} className={navClass}>
      {text}
    </Link>
  );
};

export default SidebarDropdownLink;
