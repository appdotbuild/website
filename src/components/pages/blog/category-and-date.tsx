import Date from '@/components/pages/blog/date';

import { cn } from '@/lib/utils';

interface ICategoryAndDateProps {
  className?: string;
  publishedAt: string;
}

function CategoryAndDate({ className, publishedAt }: ICategoryAndDateProps) {
  return (
    <div className={cn('flex items-center gap-x-2', className)}>
      <div className="size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
      <Date publishedAt={publishedAt} />
    </div>
  );
}

export default CategoryAndDate;
