import { Route } from 'next';

import { ROUTE } from '@/constants/route';

/**
 * Enum for SchemaTypes that should display a preview button in the view form
 */
// eslint-disable-next-line no-shadow
export enum DraftsSchemaTypes {
  BLOG_POST = 'blogPost',
  LEGAL_PAGE = 'legalPage',
}

/**
 * Map SchemaType with a preview to its corresponding route
 */
export const PREVIEW_ROUTES: Record<DraftsSchemaTypes, URL | Route<string>> = {
  [DraftsSchemaTypes.BLOG_POST]: ROUTE.blog,
  [DraftsSchemaTypes.LEGAL_PAGE]: ROUTE.legal,
};
