import FlashMessages from "@/components/flash-messages";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { File, House, Users, UsersFour } from "@phosphor-icons/react";
import React from "react";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = (
  { children },
) => {
  const menu = [
    {
      name: "Menu",
      links: [
        {
          icon: <House className="mr-2 h-4 w-4" />,
          label: "Home",
          href: route("dashboard"),
          active: route().current("dashboard"),
        },
        {
          icon: <File className="mr-2 h-4 w-4" />,
          label: "Contacts",
          href: route("contacts.index"),
          active: route().current("contacts.*"),
        },
      ],
    },
    {
      name: "Management",
      links: [
        {
          icon: <Users className="mr-2 h-4 w-4" />,
          label: "Users",
          href: route("management.users.index"),
          active: route().current("management.*.*"),
          can: "view user",
        },
      ],
    },
    {
      name: "Master Data",
      permissions: [
        "view patient",
        "view pricelist",
        "view stock",
        "view team",
      ],
      links: [
        {
          icon: <UsersFour className="mr-2 h-4 w-4" />,
          label: "Contacts",
          href: route("contacts.index"),
          active: route().current("contacts.*"),
          can: "view contact",
        },
      ],
    },
  ];

  return (
    <div className="flex-col md:flex h-screen">
      <Navbar menu={menu} />
      <div className="flex-1 overflow-hidden bg-background">
        <div className="flex">
          <Sidebar
            className="w-1/4 lg:block hidden overflow-y-auto h-screen pt-20"
            menu={menu}
          />
          <div className="flex-3 overflow-y-auto lg:border-l h-screen container pt-20 pb-10">
            {children}
          </div>
        </div>
      </div>

      <FlashMessages />
    </div>
  );
};

export default AuthenticatedLayout;
