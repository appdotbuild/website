import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import clsx from 'clsx';

import Post from '@/components/pages/blog/post/post';

import { getAllPosts, getPostBySlug } from '@/lib/blog/posts';
import { getMetadata } from '@/lib/get-metadata';
import { portableToPlain } from '@/lib/sanity/utils/portable-to-plain';
import { getExcerpt } from '@/lib/utils';

import { ROUTE } from '@/constants/route';

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { isEnabled: isDraftMode } = draftMode();
  const post = await getPostBySlug(params.slug, isDraftMode);

  if (!post) {
    notFound();
  }

  return (
    <div
      className={clsx(
        'pb-24 lg:pb-48',
        isDraftMode
          ? 'pt-[124px] md:pt-[140px] lg:pt-[130px]'
          : 'pt-[84px] md:pt-[100px] lg:pt-[90px]',
      )}
    >
      <Post post={post} className="pt-0.5 lg:pt-1.5" />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, false);

  if (!post) {
    return {};
  }

  const { seo } = post;

  const description =
    seo.description?.length > 0
      ? seo.description
      : getExcerpt({ content: portableToPlain(post.content), length: 160 });

  const metadata = getMetadata({
    title: `${seo.title}`,
    description: description,
    pathname: `${ROUTE.blog}/${post.slug.current}`,
    imagePath: seo.socialImage,
    noIndex: seo.noIndex,
  });

  return metadata;
}
