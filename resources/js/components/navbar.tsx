import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import { MenuLinks } from "./menu-links";
import { List } from "@phosphor-icons/react";
import { ModeToggle } from "@/components/mode-toggle";
import { CommandMenu } from "./command-menu";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  menu: {
    name: string;
    permissions?: string[];
    links: { icon: React.ReactNode; label: string; href: string; active: boolean; can?: string }[];
  }[];
}

export function Navbar({ menu }: NavbarProps) {
  return (
    <div className='border-b fixed w-full z-10 bg-background'>
      <div className='flex h-16 items-center px-4'>
        <Sheet>
          <SheetTrigger>
            <Button variant='ghost' className='flex mr-2 lg:hidden'>
              <List className='w-4 h-4' />
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-[300px]'>
            <MenuLinks menu={menu} />
          </SheetContent>
        </Sheet>
        <div className='ml-auto flex items-center space-x-4'>
          <CommandMenu />
          <UserNav />
        </div>
      </div>
    </div>
  );
}
