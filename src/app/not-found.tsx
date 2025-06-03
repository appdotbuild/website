import { Inter } from 'next/font/google';

import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import Link from '@/components/shared/link';

import { getMetadata } from '@/lib/get-metadata';

import { ROUTE } from '@/constants/route';
import { SEO_DATA } from '@/constants/seo-data';

import '@/styles/globals.css';

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function NotFoundPage() {
  return (
    <>
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta name="description" content={SEO_DATA.notFound.description} />
        <meta name="pathname" content={SEO_DATA.notFound.pathname} />
        <title>{SEO_DATA.notFound.title}</title>
      </head>
      <body className={`bg-page-background flex min-h-screen flex-col ${inter.variable}`}>
        <Header />
        <main className="grow">
          <section className="not-found py-40">
            <div className="container flex flex-col items-center">
              <h1 className="font-title text-40 font-medium">Oops! Page not found.</h1>
              <p className="mt-4 max-w-xl text-center font-sans text-18 leading-normal tracking-tight text-[#000]/60 sm:mt-3.5 sm:text-16 sm:leading-snug md:mt-4">
                We can&apos;t seem to find the page you&apos;re looking for. It might have been
                moved or no longer exists. Visit our{' '}
                <Link
                  href={ROUTE.index}
                  className="font-medium text-[#0073E5] hover:text-[#4DA6FF]"
                >
                  homepage
                </Link>
                .
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </body>
    </>
  );
}

export const metadata = getMetadata(SEO_DATA.notFound);
