import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { Can } from '@/Components/Can';

interface MenuLinks extends React.HTMLAttributes<HTMLDivElement> {
  menu: {
    name: string;
    permissions?: string[];
    links: { icon: React.ReactNode; label: string; href: string; active: boolean; can?: string }[];
  }[];
}

export function MenuLinks({ menu }: MenuLinks) {
  return (
    <div className='space-y-4 py-4'>
      {menu.map((m, index) => {
        return (
          <Can permission={m.permissions} key={`menu-${index}-${m.name}`}>
            <div className='px-3 py-2'>
              <h2 className='mb-2 px-4 text-sm font-semibold tracking-tight'>{m.name}</h2>
              <div className='space-y-1'>
                {m.links.map((link, j) => {
                  return (
                    <Can permission={link.can} key={`link-${j}-${link.label}`}>
                      <Link href={link.href}>
                        <Button variant={link.active ? 'secondary' : 'ghost'} className='w-full justify-start'>
                          {link.icon}
                          {link.label}
                        </Button>
                      </Link>
                    </Can>
                  );
                })}
              </div>
            </div>
          </Can>
        );
      })}
    </div>
  );
}
