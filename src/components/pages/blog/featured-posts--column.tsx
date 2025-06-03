import NextLink from 'next/link';

import CategoryAndDate from '@/components/pages/blog/category-and-date';
import { Separator } from '@/components/shared/separator';

import { IPost } from '@/types/blog';

import { cn } from '@/lib/utils';

import Authors from './authors';

interface IFeaturedPostProps {
  className?: string;
  posts: IPost[];
}

function FeaturedPost({ className, posts }: IFeaturedPostProps) {
  if (posts.length === 0) {
    return null;
  }

  const renderedPosts = posts.slice(0, 2);

  return (
    <section className={cn('featured-posts--column mt-10 md:mt-16 lg:mt-20', className)}>
      <h2 className="text-2xl font-semibold leading-normal tracking-tight text-foreground md:text-3xl md:leading-tight lg:text-4xl lg:leading-tight">
        Featured
      </h2>
      <Separator className="mb-7 mt-5 md:mb-8 md:mt-6 lg:mb-11 lg:mt-9" />
      <div className="flex flex-col gap-y-10 lg:gap-y-8">
        {renderedPosts.map(({ title, caption, publishedAt, pathname, authors }, index) => (
          <article className="flex flex-col gap-x-8 gap-y-6 sm:flex-row" key={index}>
            <div className="flex flex-col">
              <CategoryAndDate publishedAt={publishedAt} />
              <h1 className="mt-3 line-clamp-2 max-w-xl text-balance text-xl font-medium leading-snug tracking-tight lg:text-2xl lg:leading-snug">
                <NextLink href={pathname}>{title}</NextLink>
              </h1>
              <p className="mt-2 line-clamp-2 text-base tracking-tight text-muted-foreground lg:mt-3 lg:text-lg lg:leading-snug">
                {caption}
              </p>
              <Authors className="mt-3 lg:mt-4" authors={authors} size="xs" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturedPost;
