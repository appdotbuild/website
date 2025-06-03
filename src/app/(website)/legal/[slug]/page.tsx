import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import PortableContent from '@/components/pages/blog/portable-content';
import TableOfContents from '@/components/pages/blog/table-of-contents';

import { getMetadata } from '@/lib/get-metadata';
import { getAllLegalPages, getLegalPageBySlug } from '@/lib/legal/pages';
import { portableToPlain } from '@/lib/sanity/utils/portable-to-plain';
import { getExcerpt, getFormattedDate } from '@/lib/utils';

import { ROUTE } from '@/constants/route';

interface LegalPageProps {
  params: { slug: string };
}

export default async function LegalPageRoute({ params }: LegalPageProps) {
  const { isEnabled: isDraftMode } = draftMode();
  const page = await getLegalPageBySlug(params.slug, isDraftMode);

  if (!page) {
    notFound();
  }

  const { title, updatedAt, content, tableOfContents } = page;

  const formattedDate = getFormattedDate(updatedAt, 'long');

  return (
    <main className="pb-44 pt-[152px]">
      <div className="mx-auto flex max-w-screen-xl flex-col px-5 md:px-8">
        <article className="ml-auto grid max-w-screen-lg grow grid-cols-1 gap-16 lg:grid-cols-[auto_12rem] xl:pl-16">
          <header className="flex flex-col gap-2.5">
            <h1 className="font-title text-4xl font-medium leading-tight tracking-tight md:text-5xl md:leading-tight">
              {title}
            </h1>
            <p className="font-regular text-lg leading-normal tracking-tight text-muted-foreground">
              Effective date: <time dateTime={updatedAt}>{formattedDate}</time>
            </p>
          </header>

          {content && (
            <PortableContent className="col-start-1 [&>*:first-child]:mt-0" content={content} />
          )}

          <aside className="sticky top-0 col-start-2 row-start-2 -my-10 hidden h-fit max-h-svh w-full shrink-0 flex-col overflow-auto py-10 lg:flex">
            {tableOfContents && tableOfContents.length > 0 && (
              <TableOfContents
                title="On this page"
                items={tableOfContents.filter((item) => item.level === 2)}
              />
            )}
          </aside>
        </article>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const pages = await getAllLegalPages();

  return pages.map((page) => ({
    slug: page.slug.current,
  }));
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const page = await getLegalPageBySlug(params.slug, false);

  if (!page) {
    return {};
  }

  const { seo } = page;

  const description =
    seo.description?.length > 0
      ? seo.description
      : getExcerpt({ content: portableToPlain(page.content), length: 160 });

  const metadata = getMetadata({
    title: `${seo.title} | Slash`,
    description: description,
    pathname: `${ROUTE.legal}/${page.slug.current}`,
    imagePath: seo.socialImage,
    noIndex: seo.noIndex,
  });

  return metadata;
}
