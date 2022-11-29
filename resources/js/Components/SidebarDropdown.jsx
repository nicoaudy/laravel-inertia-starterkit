import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import Icon from '@/Components/Icon';
import SidebarDropdownLink from './SidebarDropdownLink';

const SidebarDropdown = ({ items, icon, text, prefixLink }) => {
    const isActive = route().current(`${prefixLink}*`);
    const [open, setOpen] = useState(false);

    const openWhenActive = useCallback(() => {
        if(isActive) {
            setOpen(true);
        }
    })
    useEffect(() => openWhenActive(), [])

    const navClass = classNames(
        "flex items-center py-2.5 px-4 justify-between rounded hover:bg-gray-800 hover:text-white",
        {
            " bg-gray-800 text-white": isActive,
            "": !isActive,
        }
    );

    const iconClasses = classNames("w-4 h-4", {
        "text-white fill-current": isActive,
        "fill-current": !isActive,
    });

    return (
        <div className="block">
            <div onClick={() => setOpen(!open)} className={navClass}>
                <div className="flex items-center space-x-2">
                    <Icon name={icon} className={iconClasses} />
                    <span>{text}</span>
                </div>
                {open ?  <Icon name='arrow-up' className="w-4 h-4" /> : <Icon name='arrow-down' className="w-4 h-4" />}
            </div>
            {open && (
                <div className="text-sm border-l-2 border-gray-800 mx-6 my-2.5 px-2.5 flex flex-col gap-y-1">
                    {items.map(({ link, text }, index) => (
                        <SidebarDropdownLink link={link} text={text} key={`${text}-${index}`} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SidebarDropdown
