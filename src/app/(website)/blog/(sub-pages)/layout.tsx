import { draftMode } from 'next/headers';

import { ReactNode } from 'react';

import clsx from 'clsx';
import { Rss } from 'lucide-react';

import Link from '@/components/shared/link';
import SearchBar from '@/components/shared/search-bar';
import { Separator } from '@/components/shared/separator';

import { ROUTE } from '@/constants/route';

export default async function BlogPagesLayout({ children }: { children: ReactNode }) {
  const { isEnabled: isDraftMode } = draftMode();

  return (
    <div
      className={clsx(
        'mx-auto flex flex-col px-5 md:max-w-[896px] md:px-8',
        isDraftMode
          ? 'pt-[124px] md:pt-[160px] lg:pt-[192px]'
          : 'pt-[95px] md:pt-[124px] lg:pt-[152px]',
      )}
    >
      <h1 className="max-w-xl text-balance font-title text-3xl font-medium leading-none -tracking-tighter text-gray-15 md:text-5xl lg:text-6xl">
        Blog
      </h1>
      <p className="mt-6 text-16 font-medium leading-normal -tracking-tighter text-muted-foreground lg:max-w-[540px] lg:text-18">
        Stay updated with the latest news, insights, and deep dives from the app.build community —
        your go-to source for open-source AI development and full-stack automation.
      </p>
      <div className="mt-12 flex items-center justify-between gap-x-5 border-border md:mt-12 lg:mt-14 lg:gap-x-6">
        <SearchBar className="w-[236px] lg:w-[232px]" placeholder="Search..." />
        <Link
          className="mr-2 whitespace-nowrap [&_svg]:size-5"
          href={ROUTE.blogRss}
          size="sm"
          variant="foreground"
        >
          <Rss size={20} />
          RSS
        </Link>
      </div>
      <Separator className="mt-9 md:mb-1 md:mt-8" />
      {children}
    </div>
  );
}
