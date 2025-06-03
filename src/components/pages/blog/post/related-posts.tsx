import type { Route } from 'next';
import NextLink from 'next/link';

import { Badge } from '@/components/shared/badge';
import Heading from '@/components/shared/content/heading';

import { type IPost } from '@/types/blog';
import { type IRelatedLink } from '@/types/content';

import { cn } from '@/lib/utils';

import Authors from '../authors';
import Date from '../date';

interface IBlogPostCard {
  className?: string;
  post: IPost;
}

function BlogPostCard({ className, post }: IBlogPostCard) {
  const { authors, publishedAt, title, pathname } = post;

  return (
    <NextLink
      className={cn(
        'group flex flex-col px-4 pb-3.5 pt-4 transition-colors duration-300 hover:bg-muted/50',
        className,
      )}
      href={pathname}
    >
      <article className="flex flex-row justify-between gap-x-5">
        <header className="flex flex-col gap-y-2.5">
          <Date publishedAt={publishedAt} />
          <h1 className="line-clamp-3 text-pretty text-base font-medium leading-tight tracking-tight text-foreground md:line-clamp-1 md:text-xl md:leading-snug">
            {title}
          </h1>
        </header>
        <Authors
          className="shrink-0 [&_img]:size-7 md:[&_img]:size-8"
          authors={authors}
          showNames={false}
          showAvatars={false}
        />
      </article>
    </NextLink>
  );
}

interface IRelatedLinkCardProps {
  className?: string;
  link: IRelatedLink;
}

function RelatedLinkCard({
  className,
  link: { title, label, url, isExternal = false },
}: IRelatedLinkCardProps) {
  const isAbsoluteUrl = url.match(/^https?:\/\//) !== null;

  const isExternalLink = isExternal || isAbsoluteUrl;

  // eslint-disable-next-line no-nested-ternary
  const badgeLabel = label ? label : isExternal ? 'External' : '';

  return (
    <NextLink
      className={cn(
        'flex flex-col p-4 transition-colors duration-300 hover:bg-muted/50',
        className,
      )}
      href={url as Route<string>}
      target={isExternalLink ? '_blank' : undefined}
      rel={isExternalLink ? 'noopener noreferrer' : undefined}
    >
      <div className="flex flex-row items-center justify-between gap-x-5">
        <div className="flex flex-col gap-y-1.5">
          <span className="flex whitespace-nowrap text-sm font-medium leading-none tracking-tight text-muted-foreground">
            {label}
          </span>
          <h3 className="line-clamp-3 text-balance text-base font-medium leading-tight tracking-tight text-foreground md:line-clamp-1 md:text-xl md:leading-snug">
            {title}
          </h3>
        </div>
        <Badge className="h-6" variant="filled" size="md">
          {badgeLabel}
        </Badge>
      </div>
    </NextLink>
  );
}

interface IRelatedPostsProps {
  className?: string;
  title?: string;
  titleId?: string;
  items: Array<IPost | IRelatedLink>;
}

function RelatedPosts({ className, title, items, titleId }: IRelatedPostsProps) {
  if (!items || items.length === 0) {return null;}

  return (
    <figure className={cn('not-prose related-posts flex flex-col', className)}>
      {title && (
        <Heading
          className="mb-8 text-2xl font-semibold leading-tight tracking-tight md:text-3xl md:leading-tight"
          id={titleId}
          tag="h2"
        >
          {title}
        </Heading>
      )}
      <div className="flex flex-col rounded-lg border border-border">
        {items.map((item, index) => {
          const isRelatedLink = item._type === 'relatedLink';
          const additionalClassName = index > 0 ? 'border-t border-border' : '';

          if (isRelatedLink) {
            return <RelatedLinkCard className={additionalClassName} key={index} link={item} />;
          }

          return <BlogPostCard className={additionalClassName} key={index} post={item} />;
        })}
      </div>
    </figure>
  );
}

export default RelatedPosts;
