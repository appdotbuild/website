import { ILegalPageData, ILegalPageWithTableOfContents } from '@/types/legal';

import { sanityFetch } from '@/lib/sanity/client';
import { legalPageBySlugQuery, legalPagesQuery } from '@/lib/sanity/queries/legal';
import { getTableOfContents } from '@/lib/sanity/utils/get-table-of-contents';

const REVALIDATE_LEGAL_TAG = ['legalPage'];

/**
 * Fetches all legal pages from Sanity
 * @param preview - Whether to use preview mode
 *
 * @returns Array of formatted legal page objects
 */
export async function getAllLegalPages(preview = false): Promise<ILegalPageData[]> {
  const pages = await sanityFetch<ILegalPageData[]>({
    query: legalPagesQuery,
    preview,
    tags: REVALIDATE_LEGAL_TAG,
  });

  return pages;
}

/**
 * Fetches a single legal page by its slug
 * @param slug - The legal page slug
 * @param preview - Whether to use preview mode
 *
 * @returns The legal page with table of contents or null if not found
 */
export async function getLegalPageBySlug(
  slug: string,
  preview = false,
): Promise<ILegalPageWithTableOfContents | null> {
  const page = await sanityFetch<ILegalPageData>({
    query: legalPageBySlugQuery,
    qParams: { slug },
    preview,
    tags: REVALIDATE_LEGAL_TAG,
  });

  if (!page) {
    return null;
  }

  return {
    ...page,
    tableOfContents: getTableOfContents(page.content),
    seo: {
      ...page.seo,
      socialImage: page.seo.socialImage ?? '/social-previews/index.jpg',
    },
  };
}
