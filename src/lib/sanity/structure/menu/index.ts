import { MenuIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/structure';

import { MENU_TYPES } from '../../constants/types';

const menuStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Menus')
    .icon(MenuIcon)
    .child(
      S.list()
        .title('Menus')
        .items([
          ...Object.entries(MENU_TYPES).map(([, { id, title, icon }]) =>
            S.listItem()
              .title(title)
              .icon(icon)
              .child(S.editor().id(id).schemaType(id).documentId(id).title(title)),
          ),
        ]),
    );

export default menuStructure;
