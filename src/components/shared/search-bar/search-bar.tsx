'use client';

import { Route } from 'next';
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';

import { Search } from 'lucide-react';

import { Button } from '@/components/shared/button';
import { Dialog, DialogTrigger } from '@/components/shared/dialog';

import { cn } from '@/lib/utils';

import { useTouchDevice } from '@/hooks/use-touch-device';

import SearchDialog from './search-dialog';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'outline';
  showOnRoute?: (Route<string> | URL)[];
  enableCmdK?: boolean;
}

function SearchBar({
  placeholder = 'Search...',
  className,
  variant = 'outline',
  showOnRoute,
  enableCmdK = true,
  ...props
}: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isTouchDevice = useTouchDevice();

  useEffect(() => {
    if (!enableCmdK || isTouchDevice) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableCmdK, isTouchDevice]);

  if (showOnRoute && showOnRoute.length > 0) {
    const isShow = showOnRoute.find((route) => pathname.startsWith(route.toString()));

    if (!isShow) {
      return null;
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            'relative h-8 w-full justify-start border border-input bg-white/50 px-4 text-13 font-normal text-muted-foreground shadow-none hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-light lg:h-8 lg:px-4 [&_svg]:size-3.5',
            className,
          )}
          variant={variant}
          aria-label="Search"
          size="sm"
          {...props}
        >
          <Search className="-ml-1.5" size={12} />
          <span className="ml-0.5 inline-flex text-[0.8125rem] font-normal">{placeholder}</span>
          {!isTouchDevice && enableCmdK && (
            <kbd className="pointer-events-none absolute right-[0.3rem] top-1/2 flex h-5 -translate-y-1/2 select-none items-center gap-px border border-border px-1.5 text-12 font-medium leading-snug tracking-tight text-muted-foreground opacity-100">
              <span className="text-base font-medium">⌘</span>K
            </kbd>
          )}
        </Button>
      </DialogTrigger>
      <SearchDialog open={open} />
    </Dialog>
  );
}

export default SearchBar;
