'use client';

import { Check, Link } from 'lucide-react';

import { Button } from '@/components/shared/button';
import { Separator } from '@/components/shared/separator';

import { cn } from '@/lib/utils';

import useCopyToClipboard from '@/hooks/use-copy-to-clipboard';

interface ISocialShareProps {
  className?: string;
  title?: string;
  pathname: string;
}

function SocialShare({ className, title = 'Share', pathname }: ISocialShareProps) {
  const { isCopied, handleCopy } = useCopyToClipboard(3000);
  const url = `${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}${pathname}`;

  return (
    <div className={cn('social-share flex flex-col items-start', className)}>
      <h3 className="text-sm font-medium leading-none tracking-tight text-muted-foreground">
        {title}
      </h3>
      <Separator className="mb-6 mt-4" orientation="horizontal" />
      <Button
        className="min-w-[102px] justify-start pl-3 pr-3.5 !text-13 [&_svg]:size-3"
        variant="outline"
        size="sm"
        onClick={() => handleCopy(url)}
      >
        {isCopied ? (
          <>
            <Check size={12} />
            Copied
          </>
        ) : (
          <>
            <Link size={12} />
            Copy <span className="sr-only">article</span> link
          </>
        )}
      </Button>
    </div>
  );
}

export default SocialShare;
