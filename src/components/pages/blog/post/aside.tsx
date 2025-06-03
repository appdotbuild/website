import { IPostWithTableOfContents } from '@/types/blog';

import { cn } from '@/lib/utils';

import { ROUTE } from '@/constants/route';

import BackToTop from '../back-to-top';
import TableOfContents from '../table-of-contents';
import SocialShare from './social-share';

interface IAsideProps {
  className?: string;
  post: IPostWithTableOfContents;
}

// TODO: hide scrollbar or add scrollAria
function Aside({ className, post }: IAsideProps) {
  const { tableOfContents } = post;

  return (
    <aside className={cn('aside -my-10 h-fit max-h-svh overflow-auto py-10', className)}>
      {tableOfContents.length > 0 && (
        <TableOfContents
          className="mt-1.5 border-b border-border pb-5"
          title="On this page"
          items={tableOfContents.filter((item) => item.level === 2)}
        />
      )}
      <BackToTop className="mt-5" />
      <SocialShare
        className="mt-12 flex-col items-start"
        title="Share article:"
        pathname={`${ROUTE.blog}/${post.slug.current}`}
      />
    </aside>
  );
}

export default Aside;
