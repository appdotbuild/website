import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import Pagination from '@/components/pages/blog/pagination';
import PostsList from '@/components/pages/blog/posts-lists--column';

import { getPaginatedPosts, getTotalPages } from '@/lib/blog/posts';
import { getMetadata } from '@/lib/get-metadata';

import { ROUTE } from '@/constants/route';
import { SEO_DATA } from '@/constants/seo-data';

interface BlogPageProps {
  params: {
    page: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { page } = params;
  const currentPage = parseInt(page, 10);
  const { isEnabled: isDraftMode } = draftMode();

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  if (currentPage === 1) {
    notFound();
  }

  const [posts, totalPages] = await Promise.all([
    getPaginatedPosts(currentPage, isDraftMode, { nonFeaturedOnly: true }),
    getTotalPages(isDraftMode),
  ]);

  if (totalPages === 0 || totalPages < currentPage) {
    notFound();
  }

  return (
    <div className="mb-24 lg:mb-48">
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

export async function generateStaticParams() {
  const totalPages = await getTotalPages();
  const params = [];

  for (let page = 2; page <= totalPages; page++) {
    params.push({
      page: page.toString(),
    });
  }

  return params;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const page = parseInt(params.page, 10);

  return getMetadata({
    title: `${SEO_DATA.blog.title}${page > 1 ? ` - Page ${page}` : ''}`,
    description: `${SEO_DATA.blog.description} ${page > 1 ? `Page ${page}` : ''}`,
    pathname: `${ROUTE.blog}/page/${page}`,
  });
}
