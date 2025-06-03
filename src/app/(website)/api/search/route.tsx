import type { Route } from 'next';
import { NextRequest, NextResponse } from 'next/server';

import { sanityFetch } from '@/lib/sanity/client';

interface ISearchItem {
  _id: number;
  title: string;
  caption?: string;
  slug: {
    current: Route<string> | URL;
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query || !query.trim()) {
      return NextResponse.json({ error: 'The query param is required' }, { status: 400 });
    }

    const searchQuery = query.trim();

    const simpleSearchQuery = `
      *[_type == "blogPost" &&
       !(_id in path("drafts.**")) && (
        title match "*${searchQuery}*"
        || caption match "*${searchQuery}*"
      )] {
        _id,
        title,
        slug,
        caption
      }
    `;

    const results = await sanityFetch<ISearchItem[]>({
      query: simpleSearchQuery,
    });

    const formattedResults = results.map((item) => ({
      ...item,
      url: `/blog/${item.slug.current}`,
      description: item.caption || '',
      icon: 'fileText',
      category: 'blog',
    }));

    return NextResponse.json({
      results: formattedResults,
      total: results.length,
      query: query,
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to generate search response' }, { status: 500 });
  }
}
