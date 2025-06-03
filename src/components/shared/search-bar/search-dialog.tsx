'use client';

import type { Route } from 'next';
import Link from 'next/link';

import { KeyboardEvent, useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/shared/button';
import { DialogClose, DialogContent, DialogTitle } from '@/components/shared/dialog';
import DynamicIcon from '@/components/shared/dynamic-icon';
import { ScrollArea, ScrollBar } from '@/components/shared/scroll-area';

import { cn } from '@/lib/utils';

import useDebounce from '@/hooks/use-debounce';
import { useTouchDevice } from '@/hooks/use-touch-device';

type ContentCategory = 'blog' | 'api' | 'guide' | 'tutorial';

interface ISearchItem {
  _id: number;
  title: string;
  icon: string;
  description?: string;
  category: ContentCategory;
  url: Route<string> | URL;
}

function useSearch() {
  const [results, setResults] = useState<ISearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);

      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const searchItems = data.results.map((item: ISearchItem) => {
        return { ...item };
      });

      setResults(searchItems || []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    results,
    isLoading,
    performSearch,
  };
}

interface SearchInputProps {
  className?: string;
  query: string;
  setQuery: (value: string) => void;
}

function SearchInput({ query, setQuery, className }: SearchInputProps) {
  return (
    <input
      className={cn(
        'remove-autocomplete-styles w-full border-b border-border bg-transparent py-3.5 pl-4 pr-16 leading-snug tracking-tight placeholder:text-muted-foreground focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',
        className,
      )}
      type="text"
      placeholder="What are you searching for?"
      value={query}
      tabIndex={1}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
SearchInput.displayName = 'SearchInput';

interface ISearchHint extends Omit<ISearchItem, 'category' | 'id'> {
  id?: number;
  category?: ContentCategory;
}

interface SearchHintProps extends ISearchHint {
  isSelected?: boolean;
  dataIndex: number;
  isLast?: boolean;
  onMouseEnter: () => void;
}

function SearchHint({
  url,
  title,
  description,
  icon,
  isSelected,
  dataIndex,
  isLast,
  onMouseEnter,
}: SearchHintProps) {
  const isFirst = dataIndex === 0;

  return (
    <Link
      className={cn(
        'outline-hidden group flex w-full cursor-pointer items-center gap-x-3 rounded-lg py-2.5 text-left transition-colors duration-150 focus-within:bg-muted/50 sm:pl-3 sm:pr-6',
        isSelected && 'sm:bg-muted/50',
        isFirst && 'scroll-mt-12',
        !isFirst && !isLast && 'scroll-my-2',
        isLast && 'scroll-mb-5',
      )}
      href={url}
      tabIndex={-1}
      data-index={dataIndex}
      onMouseEnter={onMouseEnter}
    >
      <DynamicIcon
        className={cn(
          'size-5 shrink-0 text-muted-foreground transition-colors duration-150 group-hover:text-foreground',
          isSelected && 'sm:text-foreground',
        )}
        icon={icon ?? 'fileText'}
      />
      <div className="flex flex-col gap-y-0.5">
        <p
          className={cn(
            'line-clamp-1 max-w-full text-sm font-medium leading-tight tracking-tight text-popover-foreground transition-colors duration-150',
          )}
        >
          {title}
        </p>
        {description && (
          <p
            className={cn(
              'line-clamp-1 max-w-full text-[0.8125rem] font-medium leading-snug tracking-tight text-muted-foreground transition-colors duration-150',
            )}
          >
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}

interface SearchGroupProps<T extends ISearchHint> {
  title: string;
  items: T[];
  startIndex: number;
  selectedIndex: number | null;
  totalItems: number;
  onItemChange: (index: number) => void;
}

function SearchGroup<T extends ISearchHint>({
  title,
  items,
  startIndex,
  selectedIndex,
  totalItems,
  onItemChange,
}: SearchGroupProps<T>) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-3">
      <h3 className="text-[0.8125rem] font-medium leading-none tracking-tight text-muted-foreground">
        {title}
      </h3>
      <ul>
        {items.map((item, index) => {
          const itemIndex = startIndex + index;
          const isSearchItem = 'category' in item;

          return (
            <li key={isSearchItem ? `${(item as ISearchItem).category}-${index}` : `item-${index}`}>
              <SearchHint
                {...item}
                isSelected={selectedIndex === itemIndex}
                isLast={itemIndex === totalItems - 1}
                dataIndex={itemIndex}
                onMouseEnter={() => onItemChange(itemIndex)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function NoResultsFound() {
  return (
    <p className="pt-3 text-center text-sm font-medium leading-tight tracking-tight text-muted-foreground">
      No results found.
    </p>
  );
}

interface SearchDialogProps {
  open: boolean;
}

export default function SearchDialog({ open }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { results, isLoading, performSearch } = useSearch();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const isTouchDevice = useTouchDevice();

  const allItems = useCallback((): {
    item: ISearchItem;
    index: number;
  }[] => {
    return results.map((item, index) => ({ item, index }));
  }, [results]);

  const items = allItems();
  const totalItems = items.length;

  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  const handleOpenAutoFocus = (event: Event) => {
    if (isTouchDevice) {
      event.preventDefault();
    }
  };

  const handleCloseAutoFocus = (event: Event) => {
    event.preventDefault();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();

      if (selectedIndex < totalItems - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();

      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    } else if (e.key === 'Enter' && selectedIndex !== null) {
      // handle escape button focus
      if ((e.target as HTMLElement)?.tabIndex === 2) {
        return;
      }

      e.preventDefault();
      const selectedElement = document.querySelector(
        `[data-index="${selectedIndex}"]`,
      ) as HTMLElement;
      if (selectedElement) {
        selectedElement.click();
      }
    } else if (e.key === 'Escape') {
      setSelectedIndex(0);
    }
  };

  const handleItemChange = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [results, query]);

  // Auto-scroll to selected item
  useEffect(() => {
    if (isTouchDevice) {return;}

    if (selectedIndex !== null) {
      const selectedElement = document.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedElement) {
        let blockOption: ScrollLogicalPosition = 'nearest';
        if (selectedIndex === 0) {
          blockOption = 'start';
        } else if (selectedIndex === totalItems - 1) {
          blockOption = 'end';
        }

        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: blockOption,
        });
      }
    }
  }, [selectedIndex, totalItems, isTouchDevice]);

  const renderSearchResults = () => {
    if (results.length === 0) {
      return <NoResultsFound />;
    }

    const resultsByCategory = results.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);

      return acc;
    }, {} as Record<ContentCategory, ISearchItem[]>);

    const categoryLabels: Record<ContentCategory, string> = {
      blog: 'Blog',
      api: 'API Reference',
      guide: 'Guides',
      tutorial: 'Tutorials',
    };

    let startIndex = 0;
    const categories = Object.entries(resultsByCategory).map(([category, items]) => {
      if (items.length === 0) {
        return null;
      }

      const categoryElement = (
        <SearchGroup
          key={category}
          title={categoryLabels[category as ContentCategory]}
          items={items}
          startIndex={startIndex}
          selectedIndex={selectedIndex}
          totalItems={totalItems}
          onItemChange={handleItemChange}
        />
      );

      startIndex += items.length;

      return categoryElement;
    });

    return <>{categories}</>;
  };

  return (
    <DialogContent
      className="max-w-(--breakpoint-sm) outline-hidden bottom-0 top-auto h-[75dvh] w-full translate-y-0 rounded-t-xl border-border p-0 shadow-none data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 data-[state=closed]:slide-out-to-bottom-1/2 data-[state=open]:slide-in-from-bottom-1/2 sm:bottom-auto sm:top-[20dvh] sm:h-auto sm:rounded-lg sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:slide-out-to-bottom-1 sm:data-[state=open]:slide-in-from-bottom-1"
      onOpenAutoFocus={handleOpenAutoFocus}
      onCloseAutoFocus={handleCloseAutoFocus}
    >
      <DialogTitle className="sr-only">Search</DialogTitle>
      <div className="relative flex flex-col" onKeyDown={handleKeyDown}>
        <SearchInput className={cn(isTouchDevice && 'pr-4')} query={query} setQuery={setQuery} />
        <DialogClose asChild>
          <Button
            className={cn(
              'outline-hidden absolute right-4 top-3.5 rounded border border-muted',
              isTouchDevice && 'hidden',
            )}
            variant="outline"
            tabIndex={2}
            size="xs"
          >
            <span className="sr-only">To close the search dialog, press Escape</span>
            <span className="text-xs leading-none tracking-tight" aria-hidden>
              Esc
            </span>
          </Button>
        </DialogClose>

        <ScrollArea className="max-h-[calc(75dvh-3.125rem)] sm:max-h-[min(calc(40rem-3.5rem),calc(60dvh-3.5rem))]">
          <div className="relative flex min-h-20 flex-col gap-y-5 overflow-hidden px-4 py-5">
            {isLoading && (
              <div className="flex justify-center pt-3">
                <div className="size-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
              </div>
            )}

            {!isLoading && query && renderSearchResults()}
          </div>
          <ScrollBar className="invisible" orientation="horizontal" />
        </ScrollArea>
      </div>
    </DialogContent>
  );
}
