import { type PortableTextBlock } from 'next-sanity';

import { type ISeoFields, type ISlug, type ITableOfContentsItem } from './common';

export interface ILegalPageData {
  _id: string;
  title: string;
  slug: ISlug;
  updatedAt: string;
  content: PortableTextBlock[];
  seo: ISeoFields;
}

export interface ILegalPageWithTableOfContents extends ILegalPageData {
  tableOfContents: ITableOfContentsItem[];
}
