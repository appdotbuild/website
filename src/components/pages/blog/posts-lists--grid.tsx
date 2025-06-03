import { type IPost } from '@/types/blog';

import { cn } from '@/lib/utils';

import PostCard from './post-card';

interface IPostsListProps {
  className?: string;
  posts: IPost[];
}

function PostsList({ className, posts }: IPostsListProps) {
  return (
    <section
      className={cn(
        'posts-list--grid grid grid-cols-1 gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-14',
        className,
      )}
    >
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </section>
  );
}

export default PostsList;
