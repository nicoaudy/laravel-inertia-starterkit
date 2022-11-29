import { useState } from 'react';
import SidebarDropdownLink from './SidebarDropdownLink';

const SidebarDropdown = ({ items, text }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="block">
            <div
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between hover:bg-gray-800 hover:text-white cursor-pointer py-2.5 px-4 rounded"
            >
                <div className="flex items-center space-x-2">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        ></path>
                    </svg>
                    <span>{text}</span>
                </div>
                {open ? (
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 15l7-7 7 7"
                        ></path>
                    </svg>
                ) : (
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                )}
            </div>
            {open && (
                <div className="text-sm border-l-2 border-gray-800 mx-6 my-2.5 px-2.5 flex flex-col gap-y-1">
                    <a
                        href="#"
                        class="block py-2 px-4 hover:bg-gray-800 hover:text-white rounded"
                    >
                        Categories
                    </a>
                    {items.map(({ link, text }) => {
                        <SidebarDropdownLink link={link} text={text} />;
                    })}
                </div>
            )}
        </div>
    );
}

export default SidebarDropdown
