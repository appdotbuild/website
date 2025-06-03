import type { Route } from 'next';

export const ROUTE: Record<string, Route<string> | URL> = {
  index: '/',
  blog: '/blog',
  blogRss: '/blog/rss.xml' as Route<string>,
  neon: 'https://neon.com' as Route<string>,
  github: 'https://github.com/appdotbuild' as Route<string>,
  agentGithub: 'https://github.com/appdotbuild/agent' as Route<string>,
  platformGithub: 'https://github.com/appdotbuild/platform' as Route<string>,
};
