import { usePage, Link } from '@inertiajs/react';
import classNames from 'classnames';
import Icon from '@/Components/Icon';
import SidebarDropdown from './SidebarDropdown';
import SidebarLink from './SidebarLink';

const Sidebar = ({ navOpen, appName }) => {
  const { auth } = usePage().props;

  const navClass = classNames(
    'absolute md:relative w-64 transform md:translate-x-0 h-screen overflow-y-scroll bg-black transition-all duration-300',
    {
      '-translate-x-full': !navOpen,
    }
  );

  return (
    <nav className={navClass}>
      <div className="flex flex-col justify-between h-full">
        <div className="p-4">
          <Link
            href={route('dashboard')}
            className="flex items-center text-white space-x-4"
          >
            <svg
              className="w-7 h-7 bg-indigo-600 rounded-lg p-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              ></path>
            </svg>
            <span className="text-2xl font-bold">{appName}</span>
          </Link>

          <div className="border-gray-700 py-5 text-white border-b rounded"></div>

          <div className="py-4 text-gray-400 space-y-1">
            <SidebarLink text="Dashboard" link="dashboard" icon="dashboard" />
            <SidebarLink text="Contacts" link="contacts.index" icon="office" />
            <SidebarDropdown
              text="Management"
              prefixLink="management."
              icon="book"
              items={[
                { link: 'management.permissions.index', text: 'Permissions' },
                { link: 'management.roles.index', text: 'Roles' },
                { link: 'management.users.index', text: 'Users' },
              ]}
            />
          </div>
        </div>

        {/* PROFILE */}
        <div className="text-gray-200 border-gray-800 rounded flex items-center justify-between p-2">
          <Link
            href={route('management.users.edit', auth.user.id)}
            className="flex items-center space-x-2"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${auth.user.name}&size=128&background=ff4433&color=fff`}
              className="w-7 rounded-full"
              alt="Profile"
            />
            <h1>{auth.user.name}</h1>
          </Link>
          <Link
            as="button"
            href={route('logout')}
            className="hover:bg-gray-800 hover:text-white p-2 rounded"
            method="post"
          >
            <Icon name="logout" className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
