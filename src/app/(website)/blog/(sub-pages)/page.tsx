import { Metadata } from 'next';
import { draftMode } from 'next/headers';

import Pagination from '@/components/pages/blog/pagination';
import PostsList from '@/components/pages/blog/posts-lists--column';

import { getPaginatedPosts, getTotalPages } from '@/lib/blog/posts';
import { getMetadata } from '@/lib/get-metadata';

import { SEO_DATA } from '@/constants/seo-data';

export default async function BlogPage() {
  const { isEnabled: isDraftMode } = draftMode();
  const currentPage = 1;

  const [posts, totalPages] = await Promise.all([
    getPaginatedPosts(currentPage, isDraftMode, { nonFeaturedOnly: true }),
    getTotalPages(isDraftMode),
  ]);

  if (totalPages === 0) {
    return (
      <main className="pb-20 md:pb-24 xl:pb-32">
        <p className="text-lg -tracking-tightest text-muted-foreground">No posts yet</p>
      </main>
    );
  }

  return (
    <div className="mb-12 lg:mb-14">
      <PostsList posts={posts} />
      {totalPages > 1 && (
        <Pagination
          className="mt-12 w-full md:mt-14 lg:ml-64 lg:w-fit"
          currentPage={currentPage}
          pageCount={totalPages}
        />
      )}
    </div>
  );
}

export const metadata: Metadata = getMetadata({
  title: `${SEO_DATA.blog.title}`,
  description: SEO_DATA.blog.description,
  pathname: SEO_DATA.blog.pathname,
});
