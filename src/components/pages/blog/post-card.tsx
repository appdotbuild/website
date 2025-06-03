import NextLink from 'next/link';

import Authors from '@/components/pages/blog/authors';
import CategoryAndDate from '@/components/pages/blog/category-and-date';

import { IPost } from '@/types/blog';

import { cn } from '@/lib/utils';

interface IPostCardProps {
  className?: string;
  post: IPost;
}

function PostCard({ className, post }: IPostCardProps) {
  const { authors, publishedAt, title, pathname, caption } = post;

  return (
    <article className={cn('flex flex-col gap-y-4', className)}>
      <div className="flex flex-col">
        <CategoryAndDate publishedAt={publishedAt} />
        <h1 className="mt-2.5 line-clamp-4 text-lg font-medium leading-snug tracking-tight">
          <NextLink href={pathname}>{title}</NextLink>
        </h1>
        {/* NOTE: do we need extra color for caption instead of foreground/80? */}
        <p className="mt-1.5 line-clamp-3 text-sm leading-snug tracking-tight text-foreground/80 md:text-base md:leading-snug">
          {caption}
        </p>
        {/* TODO: check do we need extra pb-2.5 here to match the design (Y gaps between cards) */}
        <Authors className="mt-2.5" authors={authors} />
      </div>
    </article>
  );
}

export default PostCard;
