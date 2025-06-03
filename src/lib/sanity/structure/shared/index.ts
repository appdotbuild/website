import { CogIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

import { getStructureDocumentViews } from '@/lib/sanity/utils/get-structure-document-views';

import { SHARED_BLOCK_TYPES } from '../../constants/types';

const sharedBlocksStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Shared Blocks')
    .icon(CogIcon)
    .child(
      S.list()
        .title('Shared Blocks')
        .items([
          ...Object.entries(SHARED_BLOCK_TYPES).map(([, { id, title, icon }]) =>
            S.listItem()
              .title(title)
              .icon(icon)
              .child(
                S.document()
                  .schemaType(id)
                  .documentId(id)
                  .title(title)
                  .views(getStructureDocumentViews(S, id)),
              ),
          ),
        ]),
    );

export default sharedBlocksStructure;
