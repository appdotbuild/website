import { BookIcon, DocumentTextIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

import { DraftsSchemaTypes } from '@/lib/sanity/constants/drafts-schema-types';

const blogStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Blog')
    .icon(BookIcon)
    .child(
      S.list()
        .title('Posts')
        .items([
          S.listItem()
            .title('Posts')
            .icon(DocumentTextIcon)
            .child(S.documentTypeList(DraftsSchemaTypes.BLOG_POST).title('All Posts')),
        ]),
    );

export default blogStructure;
