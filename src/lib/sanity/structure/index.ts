import { ExpandIcon, UsersIcon } from '@sanity/icons';
import type { StructureResolver } from 'sanity/structure';

import blogStructure from './blog';
import legalStructure from './legal';
import menuStructure from './menu';
import sharedBlocksStructure from './shared';

const structure: StructureResolver = (S) =>
  S.list()
    .title('Base')
    .items([
      blogStructure(S),
      legalStructure(S),
      S.divider(),
      sharedBlocksStructure(S),
      S.listItem()
        .title('Authors')
        .icon(UsersIcon)
        .child(S.documentTypeList('author').title('All Authors')),
      S.listItem()
        .title('Redirects')
        .icon(ExpandIcon)
        .child(S.documentTypeList('redirects').title('All Redirects')),
      S.divider(),
      menuStructure(S),
      S.divider(),
    ]);

export default structure;
