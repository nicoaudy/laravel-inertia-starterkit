import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuLinks } from "./menu-links";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  menu: {
    name: string;
    permissions?: string[];
    links: { icon: React.ReactNode; label: string; href: string; active: boolean; can?: string }[];
  }[];
}

export function Sidebar({ className, menu }: SidebarProps) {
  return (
    <div className={className}>
      <ScrollArea className='h-[calc(100vh-64px)]'>
        <MenuLinks menu={menu} />
      </ScrollArea>
    </div>
  );
}
