import React from 'react';

import { MenuIcon } from '@sanity/icons';

export interface iTypesData {
  id: string;
  title: string;
  icon: React.ComponentType | React.ReactNode;
  isList?: boolean;
  isDivider?: boolean;
  children?: Record<string, iTypesData>;
}

export type iTypes = Record<string, iTypesData>;

export const PAGE_TYPES: iTypes = {
  // TODO: Add page types here if needed
  // HOME: { id: DraftsSchemaTypes.HOME, title: 'Home', icon: StarFilledIcon },
};

export const SHARED_BLOCK_TYPES: iTypes = {
  // TODO: Add shared blocks here if needed
  // COMMUNITY: { id: 'community', title: 'Community', icon: UsersIcon },
};

export const MENU_TYPES: iTypes = {
  HEADER_MENU: { id: 'headerMenu', title: 'Header', icon: MenuIcon },
  FOOTER_MENU: { id: 'footerMenu', title: 'Footer', icon: MenuIcon },
};
