import PortableContent from '@/components/pages/blog/portable-content';

import { IPostWithTableOfContents } from '@/types/blog';

import { cn } from '@/lib/utils';

import PostHeader from './post-header';

interface IPostProps {
  className?: string;
  post: IPostWithTableOfContents;
}

function Post({ className, post }: IPostProps) {
  return (
    <section className={cn('post', className)}>
      <div className="mx-auto w-full max-w-screen-md">
        <article className="grid w-full max-w-screen-md grid-cols-1 gap-y-16 px-5 md:px-8 lg:gap-y-20">
          <PostHeader className="w-full" post={post} />
          <PortableContent
            className="[&>*:first-child]:mt-0"
            content={post.content}
            allowMediaBreakout
          />
        </article>
      </div>
    </section>
  );
}

export default Post;
