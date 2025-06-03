import { DocumentTextIcon, SplitVerticalIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

import { DraftsSchemaTypes } from '../../constants/drafts-schema-types';

const legalStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Legal')
    .icon(SplitVerticalIcon)
    .child(
      S.list()
        .title('Documents')
        .items([
          S.listItem()
            .title('Documents')
            .icon(DocumentTextIcon)
            .child(S.documentTypeList(DraftsSchemaTypes.LEGAL_PAGE).title('All Documents')),
        ]),
    );

export default legalStructure;
