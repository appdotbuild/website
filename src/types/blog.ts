import type { Route } from 'next';
import { type PortableTextBlock } from 'next-sanity';

import {
  type IAuthor,
  type ISeoFields,
  type ISlug,
  type ITableOfContentsItem,
} from '@/types/common';

export interface IAuthorData extends Omit<IAuthor, 'photo' | 'name'> {
  photo: string;
  name: string;
  description?: string;
  position?: string;
}

export interface IPost {
  _type: 'blogPost';
  title: string;
  slug: ISlug;
  pathname: URL | Route<string>;
  authors: IAuthorData[];
  isFeatured: boolean;
  publishedAt: string;
  caption: string;
  content: PortableTextBlock[];
  seo: ISeoFields;
}

export interface IPostWithTableOfContents extends IPost {
  tableOfContents: ITableOfContentsItem[];
}
