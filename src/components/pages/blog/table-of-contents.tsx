'use client';

import { useCallback, useEffect, useState } from 'react';

import { useThrottleCallback } from '@react-hook/throttle';

import Link from '@/components/shared/link';

import { ITableOfContentsItem } from '@/types/common';

import { cn } from '@/lib/utils';

interface ITableOfContentsProps {
  className?: string;
  title?: string;
  items: ITableOfContentsItem[];
}

const CURRENT_ANCHOR_GAP_PX = 20;

function useActiveAnchor(items: ITableOfContentsItem[]) {
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  const updateCurrentAnchor = useCallback(() => {
    const titles = items
      .map(({ anchor }) => document.getElementById(anchor))
      .filter((el): el is HTMLElement => Boolean(el));

    for (const el of titles) {
      const { top } = el.getBoundingClientRect();
      if (top >= CURRENT_ANCHOR_GAP_PX) {
        setActiveAnchor(el.id);

        return;
      }
    }

    if (titles.length) {
      setActiveAnchor(titles[titles.length - 1].id);
    }
  }, [items]);

  const throttledUpdate = useThrottleCallback(updateCurrentAnchor, 100);

  useEffect(() => {
    updateCurrentAnchor();
  }, [updateCurrentAnchor]);

  useEffect(() => {
    window.addEventListener('scroll', throttledUpdate);

    return () => window.removeEventListener('scroll', throttledUpdate);
  }, [throttledUpdate]);

  return { activeAnchor };
}

const handleLinkClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault();

  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  if (history.pushState) {
    history.pushState(null, '', `#${id}`);
  } else {
    window.location.hash = `#${id}`;
  }
};

function TableOfContents({ className, title, items }: ITableOfContentsProps) {
  const { activeAnchor } = useActiveAnchor(items);

  return (
    <div className={cn('table-of-contents', className)}>
      <h2 className="text-sm font-medium leading-snug -tracking-tighter">{title}</h2>
      <ul className="mt-3.5 flex flex-col gap-y-3.5">
        {items.map(({ title: itemTitle, anchor }, index) => (
          <li className="flex" key={index}>
            <Link
              className={cn(
                'line-clamp-2 w-fit leading-snug -tracking-tighter',
                activeAnchor === anchor
                  ? 'font-medium text-foreground hover:text-foreground'
                  : 'font-normal text-gray-60 hover:text-foreground',
              )}
              size="sm"
              href={`#${anchor}`}
              onClick={handleLinkClick(anchor)}
            >
              {itemTitle}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TableOfContents;
