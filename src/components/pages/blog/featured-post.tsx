import NextLink from 'next/link';

import { ChevronRight } from 'lucide-react';

import Authors from '@/components/pages/blog/authors';
import CategoryAndDate from '@/components/pages/blog/category-and-date';
import Link from '@/components/shared/link';

import { IPost } from '@/types/blog';

import { cn } from '@/lib/utils';

interface IFeaturedPostProps {
  className?: string;
  post: IPost;
}

function FeaturedPost({ className, post }: IFeaturedPostProps) {
  const { title, caption, authors, publishedAt, pathname } = post;

  return (
    <section className={cn('featured-post', className)}>
      <article className="grid grid-cols-1 flex-col gap-x-7 md:grid-cols-2 md:gap-y-4 lg:gap-x-8">
        <header className="md:order-0 col-span-1 mt-4 flex flex-col gap-y-2.5 md:col-span-2 md:mt-0 md:gap-y-4">
          <CategoryAndDate publishedAt={publishedAt} />
          <div className="flex items-end justify-between gap-x-8">
            {/* NOTE: use text-3xl because we don't have 28px font-size in Tailwind */}
            <h1 className="line-clamp-3 max-w-xl text-balance text-lg font-medium leading-snug tracking-tight md:text-2xl md:leading-snug lg:text-3xl lg:leading-snug">
              <NextLink href={pathname}>{title}</NextLink>
            </h1>
            <Authors className="hidden shrink-0 pb-1.5 md:flex" authors={authors} isPriorityLoad />
          </div>
        </header>
        <div className="flex flex-col gap-y-2.5 md:order-1 md:gap-y-4">
          {/* NOTE: do we need extra color for caption instead of foreground/80? */}
          <p className="line-clamp-6 text-sm leading-snug tracking-tight text-foreground/80 md:text-lg md:leading-normal">
            {caption}
          </p>
          <Link
            className="hidden w-fit text-sm font-medium leading-none md:inline-flex"
            href={pathname}
          >
            Read more
            <ChevronRight className="relative top-px -ml-1 w-1.5 shrink-0" />
          </Link>
          <Authors className="md:hidden" authors={authors} isPriorityLoad />
        </div>
      </article>
    </section>
  );
}

export default FeaturedPost;
