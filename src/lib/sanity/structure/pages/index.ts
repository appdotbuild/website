import { HomeIcon } from '@sanity/icons';
import {
  Divider,
  DocumentBuilder,
  DocumentListBuilder,
  ListBuilder,
  ListItemBuilder,
  StructureBuilder,
} from 'sanity/structure';

import { getStructureDocumentViews } from '@/lib/sanity/utils/get-structure-document-views';

import { PAGE_TYPES, iTypesData } from '../../constants/types';

/**
 * Generates a child item for the Sanity structure
 * @param S - The Sanity StructureBuilder
 * @param id - The ID of the item
 * @param title - The title of the item
 * @param isList - Whether the item is a list
 * @param children - The children of the item, if any
 * @returns A ListBuilder, DocumentListBuilder, or DocumentBuilder
 */
function getChildItem(
  S: StructureBuilder,
  { id, title, isList, children }: iTypesData,
): ListBuilder | DocumentListBuilder | DocumentBuilder {
  if (children) {
    return S.list()
      .title(title)
      .items(Object.values(children).flatMap((child: iTypesData) => getListItem(S, child)));
  }

  if (isList) {
    return S.documentTypeList(id).title(title);
  }

  return S.document().id(id).schemaType(id).documentId(id).views(getStructureDocumentViews(S, id));
}

/**
 * Generates a list item for the Sanity structure
 * @param S - The Sanity StructureBuilder
 * @param id - The ID of the item
 * @param title - The title of the item
 * @param icon - The icon for the item
 * @param isList - Whether the item is a list
 * @param isDivider - Whether to add a divider before the item
 * @param children - The children of the item, if any
 * @returns An array of ListItemBuilder and/or Divider
 */
function getListItem(
  S: StructureBuilder,
  { id, title, icon, isList, isDivider, children }: iTypesData,
): (ListItemBuilder | Divider)[] {
  const items: (ListItemBuilder | Divider)[] = [];

  if (isDivider) {
    // @ts-expect-error error
    items.push(S.divider());
  }

  items.push(
    S.listItem()
      .title(title)
      .icon(icon)
      .child(getChildItem(S, { id, title, icon, isList, children })),
  );

  return items;
}

/**
 * Generates the structure for the pages in the Sanity studio
 * @param S - The Sanity StructureBuilder
 * @returns A ListItemBuilder for the pages
 */
const pagesStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Pages')
    .icon(HomeIcon)
    .child(
      S.list()
        .title('Pages')
        .items(Object.values(PAGE_TYPES).flatMap((item: iTypesData) => getListItem(S, item))),
    );

export default pagesStructure;
