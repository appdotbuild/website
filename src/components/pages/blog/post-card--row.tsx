import Date from '@/components/pages/blog/date';
import Link from '@/components/shared/link';

import { IPost } from '@/types/blog';

import { cn } from '@/lib/utils';

interface IPostCardProps {
  className?: string;
  post: IPost;
}

function PostCard({ className, post }: IPostCardProps) {
  const { publishedAt, title, pathname } = post;

  return (
    <article className={cn('post-card--row', className)}>
      <Link
        className="group flex flex-col-reverse items-start gap-3.5 rounded-none border-b border-border py-5 md:grid md:grid-cols-[1fr_80px] md:items-center lg:py-6"
        href={pathname}
      >
        <h1 className="line-clamp-2 text-balance text-16 font-medium leading-tight text-foreground transition-colors duration-200 group-hover:text-foreground/80 lg:text-18">
          {title}
        </h1>
        <Date className="justify-self-end" publishedAt={publishedAt} />
      </Link>
    </article>
  );
}

export default PostCard;
