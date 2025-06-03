import { PortableTextBlock } from 'next-sanity';

import { ITableOfContentsItem } from '@/types/common';

import { generateHeadingSlug } from '@/lib/utils';

import { portableToPlain } from './portable-to-plain';

/**
 * Extracts table of contents items from portable text content
 * @param data - Array of portable text blocks
 *
 * @returns Array of table of contents items with title, anchor, and level
 */
export function getTableOfContents(data: PortableTextBlock[]): ITableOfContentsItem[] {
  if (!data || data.length === 0) {
    return [];
  }
  const idCount: Record<string, number> = {};

  return data.reduce((acc, item) => {
    if (
      (item.style === 'h2' || item.style === 'h3') &&
      (item._type === 'block' || !!item.children)
    ) {
      const text = portableToPlain(item);
      const anchor = generateHeadingSlug(text, idCount);

      const newNavItem: ITableOfContentsItem = {
        title: (item.children as { text: string }[])[0].text,
        anchor,
        level: Number(item.style.replace('h', '')),
      };

      return [...acc, newNavItem];
    }

    return acc;
  }, [] as ITableOfContentsItem[]);
}
