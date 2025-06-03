import PortableContent from '@/components/pages/blog/portable-content';

import { IPostWithTableOfContents } from '@/types/blog';

import { cn } from '@/lib/utils';

import { ROUTE } from '@/constants/route';

import PostHeader from './post-header';
import SocialShare from './social-share';

interface IPostProps {
  className?: string;
  post: IPostWithTableOfContents;
}

function Post({ className, post }: IPostProps) {
  return (
    <section className={cn('post', className)}>
      <div className="mx-auto w-full max-w-screen-xl px-5 md:px-8">
        <article className="grid w-full grid-cols-1 gap-y-16 lg:grid-cols-[auto_16rem] lg:gap-y-20 xl:grid-cols-[16rem_auto_16rem]">
          <PostHeader className="col-start-1 row-start-1 w-full xl:col-start-2" post={post} />
          <div className="col-start-1 row-start-2 xl:col-start-2">
            <PortableContent className="[&>*:first-child]:mt-0!" content={post.content} />
            <SocialShare
              className="mt-11 md:mt-14"
              pathname={`${ROUTE.blog}/${post.slug.current}`}
            />
          </div>
        </article>
      </div>
    </section>
  );
}

export default Post;
