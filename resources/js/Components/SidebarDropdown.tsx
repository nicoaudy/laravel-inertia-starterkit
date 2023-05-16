import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import SidebarDropdownLink from './SidebarDropdownLink';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';

interface SidebarDropdownProps {
  items: {
    link: string;
    text: string;
    can?: boolean;
    active: boolean;
  }[];
  icon: React.ReactNode;
  text: string;
  active: boolean;
}

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({ items, icon, text, active }) => {
  const [open, setOpen] = useState(false);

  const openWhenActive = useCallback(() => {
    if (active) {
      setOpen(true);
    }
  }, [active]);

  useEffect(() => {
    openWhenActive();
  }, [openWhenActive]);

  const navClass = classNames(
    'flex items-center py-2.5 px-4 justify-between rounded hover:bg-gray-800 hover:text-white',
    {
      'bg-gray-800 text-white': active,
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
          {items.map(({ link, text, can, active }, index) => {
            if (!can) return null;

            return <SidebarDropdownLink link={link} text={text} key={`${text}-${index}`} active={active} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarDropdown;
