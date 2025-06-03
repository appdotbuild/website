import { Route } from 'next';

import { MENU_ICONS } from '@/constants/menu-icons';

export interface IHeaderSettings {
  linkName: string;
  linkUrl: Route<string> | URL;
  buttonName: string;
  buttonUrl: Route<string> | URL;
}

export interface IHeaderMenuData {
  menuItems: IMenuItem[];
  headerSettings: IHeaderSettings;
}

export interface IMenuItem {
  title: string;
  link: Route<string> | URL;
}

export interface ISubMenuLink {
  title: string;
  icon: keyof typeof MENU_ICONS;
  link: Route<string> | URL;
}

export interface ISimpleMenuLink {
  title: string;
  link: Route<string> | URL;
}

export interface IFooterMenuData {
  links: ISimpleMenuLink[];
  social: ISubMenuLink[];
}
