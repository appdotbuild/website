import { IFooterMenuData, IHeaderMenuData } from '@/types/menus';

import { sanityFetch } from '@/lib/sanity/client';
import { footerMenuQuery, headerMenuQuery } from '@/lib/sanity/queries/menus';

const REVALIDATE_HEADER_MENU_TAG = ['headerMenus'];
const REVALIDATE_FOOTER_MENU_TAG = ['footerMenus'];

/**
 * Fetches all header menu items from Sanity
 * @param preview - Whether to use preview mode
 *
 * @returns Object of header menu items objects and headerSettings object
 */
export async function getHeaderMenus(preview = false): Promise<IHeaderMenuData> {
  return await sanityFetch<IHeaderMenuData>({
    query: headerMenuQuery,
    preview,
    tags: REVALIDATE_HEADER_MENU_TAG,
  });
}

/**
 * Fetches all footer menu items from Sanity
 * @param preview - Whether to use preview mode
 *
 * @returns Object of footer menu columns objects
 */
export async function getFooterMenus(preview = false): Promise<IFooterMenuData> {
  return await sanityFetch<IFooterMenuData>({
    query: footerMenuQuery,
    preview,
    tags: REVALIDATE_FOOTER_MENU_TAG,
  });
}
