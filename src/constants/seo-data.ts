import { Route } from 'next';

import { ROUTE } from '@/constants/route';

export const SEO_DATA = {
  notFound: {
    title: 'App.Build | Page Not Found',
    description: '',
    pathname: '' as Route<string>,
  },
  index: {
    title: 'App.Build | Official Website',
    description: '',
    pathname: ROUTE.index as Route<string>,
  },
  blog: {
    title: `Blog`,
    description: 'Read the latest articles, news, and reviews on our blog',
    pathname: ROUTE.blog as Route<string>,
  },
};
