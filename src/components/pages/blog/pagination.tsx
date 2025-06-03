'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';

import ReactPaginate from 'react-paginate';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { ROUTE } from '@/constants/route';

interface IPaginationProps {
  currentPage: number;
  pageCount: number;
  className?: string;
}

function Pagination({ currentPage, pageCount, className }: IPaginationProps) {
  const router = useRouter();

  const hrefBuilder = (page: number, pageQty: number) => {
    const basePath = ROUTE.blog;
    const pageNumber = page > 1 && page <= pageQty ? `/page/${page}` : '';

    return basePath + pageNumber;
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    const page = selected + 1;

    const basePath = ROUTE.blog;

    const navigateTo = page === 1 ? basePath : `${basePath}/page/${page}`;

    router.push(navigateTo as Route<string>);
  };

  return (
    <nav className={cn(className)}>
      <ReactPaginate
        breakLabel="..."
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        forcePage={currentPage - 1}
        hrefBuilder={hrefBuilder}
        containerClassName="flex justify-center items-center gap-x-3 [&>li]:leading-snug"
        pageLinkClassName="flex size-9 justify-center items-center font-medium text-xs tracking-tight border border-transparent leading-none transition-colors duration-300 hover:border-border/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        breakLinkClassName="flex size-9 justify-center items-center font-medium text-xs tracking-tight border border-transparent leading-none transition-colors duration-300 hover:border-border/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        activeLinkClassName="border !border-border pointer-events-none"
        previousClassName="mr-auto flex self-stretch"
        nextClassName="ml-auto flex self-stretch"
        previousLinkClassName="mr-auto flex items-center gap-x-1.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:text-foreground/80 md:mr-12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        nextLinkClassName="ml-auto flex items-center gap-x-1.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:text-foreground/80 md:ml-12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        disabledLinkClassName="pointer-events-none text-muted-foreground"
        previousLabel={
          <>
            <ArrowLeft className="shrink-0" size={14} />
            <span className="-ml-0.5 hidden leading-none tracking-tight md:inline-flex">
              Previous
            </span>
          </>
        }
        nextLabel={
          <>
            <span className="-mr-0.5 hidden leading-none tracking-tight md:inline-flex">Next</span>
            <ArrowRight className="shrink-0" size={14} />
          </>
        }
        renderOnZeroPageCount={null}
        onPageChange={handlePageClick}
      />
    </nav>
  );
}

export default Pagination;
