import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React from "react";
import { useTheme } from "./theme-provider";
import { router } from "@inertiajs/react";
import { type DialogProps } from "@radix-ui/react-alert-dialog";
import { FileSearch, Monitor } from "@phosphor-icons/react";
import { ChevronRightIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

export interface Item {
  id: number;
  icon: React.ReactNode;
  // router: string;
  myAction: () => void;
  name: string;
}

export interface CommandBar {
  category: string;
  items: Item[];
}

export function CommandMenu({ ...props }: DialogProps) {
  const { setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const group: CommandBar[] = [
    {
      category: "Navigation",
      items: [
        {
          id: 1,
          icon: <ChevronRightIcon className='mr-2 h-4 w-4' aria-hidden='true' />,
          myAction: function () {
            router.visit(route("dashboard"));
          },
          name: "Go to Home",
        },
      ],
    },

    {
      category: "General",
      items: [
        {
          id: 1,
          icon: <MoonIcon className='mr-2 h-4 w-4' aria-hidden='true' />,
          myAction: function () {
            setTheme("dark");
          },
          name: "Change Theme to Dark",
        },
        {
          id: 2,
          icon: <SunIcon className='mr-2 h-4 w-4' aria-hidden='true' />,
          myAction: function () {
            setTheme("light");
          },
          name: "Change Theme to Light",
        },
        {
          id: 3,
          icon: <Monitor className='mr-2 h-4 w-4' aria-hidden='true' />,
          myAction: function () {
            setTheme("system");
          },
          name: "Change Theme to System",
        },
      ],
    },
  ];

  return (
    <div>
      <Button
        variant='outline'
        className={cn("relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64")}
        onClick={() => setOpen(true)}
        {...props}>
        <FileSearch className='mr-2 h-4 w-4' aria-hidden='true' />
        <span className='hidden lg:inline-flex'>Search here...</span>
        <span className='inline-flex lg:hidden'>Search...</span>

        <kbd className='pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {group.map((group) => (
            <CommandGroup key={group.category} heading={group.category}>
              {group.items.map((item) => {
                return (
                  <CommandItem
                    key={item.id}
                    onSelect={() =>
                      runCommand(() => {
                        item.myAction();
                      })
                    }>
                    {item.icon}
                    {item.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
