'use client';

import { useRouter } from 'next/navigation';

import { useCallback, useState } from 'react';

import { cn } from '@/lib/utils';

const EXIT_PREVIEW_API_URL = '/api/preview?disable=true';

interface IPreviewWarningProps {
  className?: string;
}

function PreviewWarning({ className }: IPreviewWarningProps) {
  const router = useRouter();
  // const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);

  // TODO: enable if you want to show the warning when the page is opening in the iframe (preview mode in Sanity Studio)
  // useEffect(() => {
  //   setVisible(!window.frameElement);
  // }, []);

  const onClick = useCallback(async () => {
    setPending(true);

    try {
      const response = await fetch(EXIT_PREVIEW_API_URL);
      if (response.ok) {
        router.refresh();
      } else {
        throw new Error('Something went wrong while exiting preview mode');
      }
    } catch (error) {
      /* eslint-disable no-console */
      console.error(error);
    }
  }, [router]);

  // if (visible) {
  return (
    <div className={cn('fixed left-0 right-0 top-0 z-50 bg-background', className)}>
      <div className="border-b border-border px-6 py-3.5 text-center text-sm leading-snug tracking-tight text-muted-foreground">
        You are in the Preview Mode, which means you can see drafts version of content&nbsp;&bull;{' '}
        <button
          type="button"
          className={cn(
            'relative text-inherit before:absolute before:-inset-x-4 before:-inset-y-2',
            {
              underline: !pending,
              italic: pending,
            },
          )}
          disabled={pending}
          onClick={onClick}
        >
          {pending ? 'Exiting...' : 'Exit Preview Mode'}
        </button>
      </div>
    </div>
  );
  // }

  // return null;
}

export default PreviewWarning;
