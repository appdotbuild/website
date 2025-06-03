import { Separator } from '@/components/shared/separator';

import { IPostWithTableOfContents } from '@/types/blog';

import { portableToPlain } from '@/lib/sanity/utils/portable-to-plain';
import { cn, getTimeToRead } from '@/lib/utils';

import Authors from '../authors';
import Date from '../date';

interface IPostHeaderProps {
  className?: string;
  post: IPostWithTableOfContents;
}

function PostHeader({ className, post }: IPostHeaderProps) {
  const { title, authors, publishedAt, caption } = post;

  const timeToRead = getTimeToRead(post.content, portableToPlain);

  return (
    <header className={cn('post-header', className)}>
      <h1 className="mt-5 text-balance text-3xl font-semibold leading-tight -tracking-tighter md:text-4xl md:leading-tight lg:text-5xl lg:font-medium lg:leading-tight">
        {title}
      </h1>
      {caption && (
        <p className="mt-4 text-balance text-lg leading-snug -tracking-tighter text-muted-foreground md:text-xl md:leading-snug lg:text-2xl lg:leading-snug">
          {caption}
        </p>
      )}
      <Separator className="my-5" />
      <div className="flex items-center justify-between gap-3">
        <Authors authors={authors} size="xs" showAvatars={false} />
        <div className="flex items-center">
          <Date className="md:text-sm md:leading-none" publishedAt={publishedAt} />
          <div className="mx-2 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
          <time
            className="text-[0.8125rem] font-medium leading-none tracking-tight text-muted-foreground md:text-sm"
            aria-label={`Read time: ${timeToRead}`}
          >
            {timeToRead}
          </time>
        </div>
      </div>
    </header>
  );
}

export default PostHeader;
