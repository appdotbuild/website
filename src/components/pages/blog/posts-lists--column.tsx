import { type IPost } from '@/types/blog';

import { cn } from '@/lib/utils';

import PostCard from './post-card--row';

interface IPostsListProps {
  className?: string;
  posts: IPost[];
}

function PostsList({ className, posts }: IPostsListProps) {
  return (
    <section className={cn('posts-list--column flex flex-col', className)}>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </section>
  );
}

export default PostsList;
