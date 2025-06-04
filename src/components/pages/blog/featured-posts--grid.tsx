import NextLink from 'next/link';

import CategoryAndDate from '@/components/pages/blog/category-and-date';
import { Separator } from '@/components/shared/separator';

import { IPost } from '@/types/blog';

import { cn } from '@/lib/utils';

interface IFeaturedPostProps {
  className?: string;
  posts: IPost[];
}

function FeaturedPost({ className, posts }: IFeaturedPostProps) {
  if (posts.length === 0) {
    return null;
  }

  const [featuredPost, ...restPosts] = posts.slice(0, 4);

  return (
    <section className={cn('featured-posts--grid mt-10 md:mt-16 lg:mt-20', className)}>
      <h2 className="text-2xl font-semibold leading-normal -tracking-tightest text-foreground md:text-3xl md:leading-tight lg:text-4xl lg:leading-tight">
        Featured
      </h2>
      <Separator className="mb-7 mt-5 md:mb-8 md:mt-6 lg:mb-11 lg:mt-9" />
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-[22rem_auto] lg:grid-cols-[26rem_auto] xl:grid-cols-[30rem_auto]">
        <article className="flex flex-col gap-y-3 lg:gap-y-4">
          <h1 className="line-clamp-3 text-xl font-medium leading-snug -tracking-tightest transition-colors duration-300 hover:text-foreground/80 md:text-2xl md:leading-snug lg:line-clamp-2 lg:text-3xl lg:leading-tight">
            <NextLink
              className="focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue"
              href={featuredPost.pathname}
            >
              {featuredPost.title}
            </NextLink>
          </h1>
        </article>
        <div className="flex flex-col gap-y-7 lg:gap-y-8">
          {restPosts.map(({ title, publishedAt, pathname }, index) => (
            <article className="flex flex-col gap-y-2.5" key={index}>
              <CategoryAndDate publishedAt={publishedAt} />
              <h1 className="line-clamp-2 text-lg font-medium leading-tight -tracking-tightest transition-colors duration-300 hover:text-foreground/80 lg:text-xl lg:leading-snug">
                <NextLink
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue"
                  href={pathname}
                >
                  {title}
                </NextLink>
              </h1>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedPost;
