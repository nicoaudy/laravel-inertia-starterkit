import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import SidebarDropdownLink from './SidebarDropdownLink';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';

const SidebarDropdown = ({ items, icon, text, prefixLink }) => {
  const isActive = route().current(`${prefixLink}*`);
  const [open, setOpen] = useState(false);

  const openWhenActive = useCallback(() => {
    if (isActive) {
      setOpen(true);
    }
  });
  useEffect(() => openWhenActive(), []);

  const navClass = classNames(
    'flex items-center py-2.5 px-4 justify-between rounded hover:bg-gray-800 hover:text-white',
    {
      'bg-gray-800 text-white': isActive,
    }
  );

  return (
    <div className='block'>
      <div onClick={() => setOpen(!open)} className={navClass}>
        <div className='flex items-center space-x-2'>
          {icon}
          <span>{text}</span>
        </div>
        {open ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
      </div>
      {open && (
        <div className='text-sm border-l-2 border-gray-800 mx-6 my-2.5 px-2.5 flex flex-col gap-y-1'>
          {items.map(({ link, text, can }, index) => {
            if (!can) return null;

            return <SidebarDropdownLink link={link} text={text} key={`${text}-${index}`} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarDropdown;
