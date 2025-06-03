import { cn, getFormattedDate } from '@/lib/utils';

interface IDateProps {
  className?: string;
  publishedAt: string;
}

function Date({ className, publishedAt }: IDateProps) {
  return (
    <time
      className={cn(
        'flex whitespace-nowrap text-[13px] font-medium uppercase leading-none -tracking-tighter text-muted-foreground',
        className,
      )}
      dateTime={publishedAt}
    >
      {getFormattedDate(publishedAt)}
    </time>
  );
}

export default Date;
