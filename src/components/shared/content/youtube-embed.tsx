'use client';

import { ReactNode, useState } from 'react';

import { cva } from 'class-variance-authority';
import { Play } from 'lucide-react';

import { IYouTubeEmbed } from '@/types/common';

import { cn } from '@/lib/utils';

export interface IYouTubeEmbedProps extends IYouTubeEmbed {
  className?: string;
  children: ReactNode;
  width?: number;
  height?: number;
  variant?: 'default' | 'outline';
}

const youtubeVariants = cva('relative', {
  variants: {
    variant: {
      default: '',
      outline:
        'rounded-xl p-2 before:pointer-events-none before:absolute before:inset-0 before:z-40 before:rounded-xl before:border before:border-border',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function YouTubeEmbed({
  children,
  youtubeId,
  width = 704,
  height = Math.ceil(704 / 1.777),
  className,
  variant = 'default',
}: IYouTubeEmbedProps) {
  const [isVideoActive, setIsVideoActive] = useState(false);

  const handleVideoClick = () => {
    setIsVideoActive(true);
  };

  return (
    <figure
      className={cn(
        'youtube-embed not-prose relative flex overflow-hidden',
        youtubeVariants({ variant }),
        className,
      )}
    >
      <button
        className="w-full rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange"
        role="button"
        onClick={handleVideoClick}
      >
        <div className={cn('aspect-video size-full bg-background', isVideoActive && 'invisible')}>
          {children}
        </div>
        <div
          className="absolute left-4 top-4 flex h-8 items-center justify-center gap-x-2 rounded-full bg-background px-3 text-xs font-semibold tracking-tight shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange lg:left-6 lg:top-6 lg:pl-3 lg:pr-4"
          tabIndex={isVideoActive ? -1 : 0}
        >
          <Play className="shrink-0" size={14} />
          <span className="sr-only sm:not-sr-only">Play video</span>
        </div>
      </button>
      {isVideoActive && (
        <div className={cn('absolute inset-0', variant === 'outline' && 'p-2')}>
          <iframe
            className={cn(
              'aspect-video size-full bg-background',
              variant === 'outline' && 'rounded-lg',
              variant === 'default' && 'rounded-xl',
            )}
            width={width}
            height={height}
            src={`https://www.youtube.com/embed/${youtubeId}?&autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
    </figure>
  );
}

export default YouTubeEmbed;
