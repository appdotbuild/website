import Rss from 'rss';

import { getAllPosts } from '@/lib/blog/posts';

import { ROUTE } from '@/constants/route';

const SITE_URL = process.env.NEXT_PUBLIC_DEFAULT_SITE_URL!;

export async function GET() {
  try {
    const blogPosts = await getAllPosts();

    const feed = new Rss({
      language: 'en',
      title: 'Blog — App.Build',
      description: 'Latest blog posts',
      feed_url: `${SITE_URL}${ROUTE.blogRss}`,
      site_url: SITE_URL,
      custom_namespaces: {
        media: 'http://search.yahoo.com/mrss/',
      },
    });

    blogPosts.forEach(({ title, pathname, publishedAt, authors, caption }) => {
      const url = `${SITE_URL}${pathname}`;
      feed.item({
        guid: pathname as string,
        title,
        description: caption || '',
        url,
        date: new Date(publishedAt),
        author: authors ? authors.map((author) => author.name).join(', ') : '',
      });
    });

    return new Response(feed.xml(), {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error generating RSS feed:', error);

    return new Response('Error generating RSS feed', { status: 500 });
  }
}
