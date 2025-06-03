import author from './author';
import content from './content';
import menus from './menus';
import redirects from './redirects';
import seo from './seo';

export default [author, redirects, seo, ...content, ...menus];
