import { IPost, IPostWithTableOfContents } from '@/types/blog';

import { sanityFetch } from '@/lib/sanity/client';
import {
  paginatedNonFeaturedPostsQuery,
  paginatedPostsQuery,
  postBySlugQuery,
  postsQuery,
  totalPostsQuery,
} from '@/lib/sanity/queries/blog';
import { getTableOfContents } from '@/lib/sanity/utils/get-table-of-contents';

const POSTS_PER_PAGE = 12;
const REVALIDATE_BLOG_TAG = ['blog'];

/**
 * Transforms a post data object from Sanity into the application's post format
 * @param post - The raw post data from Sanity
 *
 * @returns A formatted post object
 */
function transformPost(post: IPost): IPost {
  return {
    ...post,
  };
}

/**
 * Fetches all blog posts from Sanity
 * @param preview - Whether to use preview mode
 *
 * @returns Array of formatted post objects
 */
export async function getAllPosts(preview = false): Promise<IPost[]> {
  const posts = await sanityFetch<IPost[]>({
    query: postsQuery,
    preview,
    tags: REVALIDATE_BLOG_TAG,
  });

  return posts.map(transformPost);
}

/**
 * Fetches a single post by its slug
 * @param slug - The post slug
 * @param preview - Whether to use preview mode
 *
 * @returns The post with table of contents or null if not found
 */
export async function getPostBySlug(
  slug: string,
  preview = false,
): Promise<IPostWithTableOfContents | null> {
  const post = await sanityFetch<IPost>({
    query: postBySlugQuery,
    qParams: { slug },
    preview,
    tags: REVALIDATE_BLOG_TAG,
  });

  if (!post) {
    return null;
  }

  return {
    ...transformPost(post),
    tableOfContents: getTableOfContents(post.content),
    seo: {
      ...post.seo,
      socialImage:
        post.seo.socialImage ??
        `${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}/api/og?template=blog&title=${post.seo.title}`,
    },
  };
}

/**
 * Get post counts with both total and non-featured counts in a single query
 * @param preview Preview mode flag
 *
 * @returns Object with total and nonFeatured counts
 */
export async function getPostCounts(preview = false): Promise<{
  total: number;
  nonFeatured: number;
}> {
  return await sanityFetch({
    query: totalPostsQuery,
    preview,
    tags: REVALIDATE_BLOG_TAG,
  });
}

/**
 * Get page counts with both total and non-featured counts
 * @param preview Preview mode flag
 *
 * @returns Object with total and nonFeatured page counts
 */
export async function getTotalPages(preview = false): Promise<number> {
  const { total, nonFeatured } = await getPostCounts(preview);

  if (!total || total === 0) {
    return 0;
  }

  if (total === 1) {
    return 1;
  }

  return Math.ceil(nonFeatured / POSTS_PER_PAGE);
}

/**
 * Fetches paginated posts
 * @param page - The page number to fetch (1-based)
 * @param preview - Whether to use preview mode
 * @param options - Additional options for filtering posts
 * @param options.nonFeaturedOnly - Whether to exclude featured posts
 *
 * @returns Array of formatted post objects for the requested page
 */
export async function getPaginatedPosts(
  page = 1,
  preview = false,
  options?: {
    nonFeaturedOnly?: boolean;
  },
): Promise<IPost[]> {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const query = options?.nonFeaturedOnly ? paginatedNonFeaturedPostsQuery : paginatedPostsQuery;

  const posts = await sanityFetch<IPost[]>({
    query,
    qParams: { start, end },
    preview,
    tags: REVALIDATE_BLOG_TAG,
  });

  return posts.map(transformPost);
}
