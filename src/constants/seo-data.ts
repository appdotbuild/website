import { Route } from 'next';

import { ROUTE } from '@/constants/route';

export const SEO_DATA = {
  notFound: {
    title: 'Page Not Found – The Open-Source AI Agent',
    description: '',
    pathname: '' as Route<string>,
  },
  index: {
    title: 'Open Source AI Agent: Build Full Stack Apps',
    description:
      'App.build is an open-source AI agent that generates and deploys full-stack apps with Postgres. Use it as a reference to build your own agent.',
    pathname: ROUTE.index as Route<string>,
  },
  blog: {
    title: 'app.build Blog – The Open-Source AI Agent',
    description:
      'Insights and updates from the team behind app.build, an open-source AI agent that builds and deploy full-stack apps.',
    pathname: ROUTE.blog as Route<string>,
  },
};
